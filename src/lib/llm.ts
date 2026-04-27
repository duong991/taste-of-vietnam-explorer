const HF_ENDPOINT = "https://router.huggingface.co/v1/chat/completions";

export interface ModelOption {
  value: string;
  label: string;
}

export const HF_MODELS: ModelOption[] = [
  { value: "meta-llama/Llama-3.3-70B-Instruct",  label: "Llama 3.3 70B" },
  { value: "Qwen/Qwen2.5-72B-Instruct",          label: "Qwen 2.5 72B" },
  { value: "mistralai/Mistral-7B-Instruct-v0.3", label: "Mistral 7B" },
  { value: "google/gemma-3-27b-it",              label: "Gemma 3 27B" },
  { value: "deepseek-ai/DeepSeek-R1",            label: "DeepSeek R1" },
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

interface HFResponse { choices: { message: { content: string } }[] }

export async function callLLM(messages: LLMMessage[]): Promise<string> {
  const model = resolveModel();
  const apiKey = (import.meta.env.VITE_HF_API_KEY as string | undefined) ?? "";

  if (!apiKey || apiKey.includes("...")) {
    throw new LLMError(
      "Chưa cấu hình API key. Vui lòng thêm VITE_HF_API_KEY vào file .env.",
      "no-key",
    );
  }

  let res: Response;
  try {
    res = await fetch(HF_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ model, messages, temperature: 0.7, max_tokens: 800 }),
    });
  } catch {
    throw new LLMError("Không thể kết nối tới máy chủ. Vui lòng kiểm tra mạng.", "network");
  }

  if (res.status === 429) throw new LLMError("Đang có quá nhiều yêu cầu. Vui lòng thử lại sau ít giây.", "rate-limit");
  if (!res.ok)           throw new LLMError(`Lỗi từ HuggingFace API (${res.status}). Vui lòng thử lại.`, "api");

  const data = (await res.json()) as HFResponse;
  return data.choices[0].message.content;
}
