import { NextResponse } from "next/server";

const VOLL_TRIGGER_URL =
  "https://produtos.vollsc.com/api/triggers/activate/b48377af-356f-4c06-8e3f-9c50ebeea216";
const ALLOWED_EVENTS = new Set([
  "carrinho_abandonado",
  "pagamento_aprovado",
  "pedido_caminho",
]);

type WorkflowPayload = {
  action?: string;
  whatsapp?: string;
  event?: string;
  cart?: string;
};

export async function POST(request: Request) {
  const apiKey = process.env.VOLL_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "VOLL_API_KEY não configurada no ambiente do servidor." },
      { status: 500 },
    );
  }

  let payload: WorkflowPayload;
  try {
    payload = (await request.json()) as WorkflowPayload;
  } catch {
    return NextResponse.json({ error: "Body JSON inválido." }, { status: 400 });
  }

  const whatsapp = String(payload.whatsapp || "").replace(/\D/g, "");
  const event = String(payload.event || "");
  const cart = String(payload.cart || "").trim();

  if (payload.action !== "WHATSAPP") {
    return NextResponse.json({ error: "A action deve ser WHATSAPP." }, { status: 400 });
  }

  if (!whatsapp || !event || !ALLOWED_EVENTS.has(event) || !cart) {
    return NextResponse.json(
      {
        error:
          "Campos obrigatórios: action, whatsapp, event e cart. Evento inválido.",
      },
      { status: 400 },
    );
  }

  const body = JSON.stringify({
    action: "WHATSAPP",
    whatsapp,
    event,
    cart,
  });

  try {
    const response = await fetch(
      `${VOLL_TRIGGER_URL}?voll-api-key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
        cache: "no-store",
      },
    );

    const responseText = await response.text();
    let responseBody: unknown = responseText;
    try {
      responseBody = JSON.parse(responseText);
    } catch {
      // Mantém respostas não-JSON como texto para facilitar o diagnóstico.
    }

    return NextResponse.json(
      { ok: response.ok, event, request: JSON.parse(body), response: responseBody },
      { status: response.ok ? 200 : response.status },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Não foi possível conectar ao Voll Workflows.",
        detail: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 502 },
    );
  }
}
