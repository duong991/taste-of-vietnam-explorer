const HF_ENDPOINT = "https://router.huggingface.co/v1/chat/completions";

export interface ModelOption {
    value: string;
    label: string;
}

export const HF_MODELS: ModelOption[] = [
    { value: "meta-llama/Llama-3.3-70B-Instruct", label: "Llama 3.3 70B" },
    { value: "Qwen/Qwen2.5-72B-Instruct", label: "Qwen 2.5 72B" },
    { value: "mistralai/Mistral-7B-Instruct-v0.3", label: "Mistral 7B" },
    { value: "google/gemma-3-27b-it", label: "Gemma 3 27B" },
    { value: "deepseek-ai/DeepSeek-R1", label: "DeepSeek R1" },
];

export const DEFAULT_MODEL = HF_MODELS[0].value;

function resolveModel(): string {
    const envModel = import.meta.env.VITE_HF_MODEL as string | undefined;
    return envModel && envModel.trim() ? envModel.trim() : DEFAULT_MODEL;
}

/* ── Shared types ────────────────────────────────────────────────── */

export type LLMErrorCode = "no-key" | "rate-limit" | "network" | "api";

export class LLMError extends Error {
    constructor(
        message: string,
        public readonly code: LLMErrorCode,
    ) {
        super(message);
        this.name = "LLMError";
    }
}

export interface LLMMessage {
    role: "system" | "user" | "assistant";
    content: string;
}

/* ── HuggingFace Inference (OpenAI-compatible) ───────────────────── */

interface HFResponse {
    choices: { message: { content: string } }[];
}

import { getUserApiKey } from "./apiKey";

export async function callLLM(
    messages: LLMMessage[],
    t?: (key: string, opts?: Record<string, string | number>) => string,
): Promise<string> {
    const model = resolveModel();
    const apiKey = getUserApiKey() ?? (import.meta.env.VITE_HF_API_KEY as string | undefined) ?? "";

    const _t =
        t ??
        ((k: string, opts?: Record<string, string | number>) => {
            const defaults: Record<string, string> = {
                "chatbot.llm_no_key":
                    "Chưa cấu hình API key. Nhấn nút bánh răng ⚙️ trong khung chat để nhập key, hoặc thêm VITE_HF_API_KEY vào file .env.",
                "chatbot.llm_network":
                    "Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng.",
                "chatbot.llm_rate_limit":
                    "Đang có quá nhiều yêu cầu. Vui lòng thử lại sau ít giây.",
                "chatbot.llm_api": `Lỗi từ HuggingFace API (${opts?.status ?? "unknown"}). Vui lòng thử lại.`,
            };
            return defaults[k] ?? k;
        });

    if (!apiKey || apiKey.includes("...")) {
        throw new LLMError(_t("chatbot.llm_no_key"), "no-key");
    }

    let res: Response;
    try {
        res = await fetch(HF_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model,
                messages,
                temperature: 0.7,
                max_tokens: 800,
            }),
        });
    } catch {
        throw new LLMError(_t("chatbot.llm_network"), "network");
    }

    if (res.status === 429)
        throw new LLMError(_t("chatbot.llm_rate_limit"), "rate-limit");
    if (!res.ok)
        throw new LLMError(
            _t("chatbot.llm_api", { status: String(res.status) }),
            "api",
        );

    const data = (await res.json()) as HFResponse;
    return data.choices[0].message.content;
}
