# Voll Demo E-commerce

Demo de e-commerce integrada ao Voll Workflows.

## Cenários

- Recuperação de carrinho abandonado
- Notificação de pagamento aprovado
- Atualizações de separação e despacho
- Notificação de pedido a caminho

## Acionamento do Voll Workflows

Os estágios são manuais. Ao clicar no estágio correspondente, o servidor envia para o trigger do Voll:

```json
{
  "action": "WHATSAPP",
  "whatsapp": "5511999992244",
  "event": "carrinho_abandonado",
  "cart": "Papaiz Smart Lock SL100"
}
```

Os eventos disponíveis são `carrinho_abandonado`, `pagamento_aprovado` e `pedido_caminho`.

Configure `VOLL_API_KEY` como variável de ambiente no Render. A chave não fica exposta no navegador nem deve ser commitada no GitHub.

## Executar localmente

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.
