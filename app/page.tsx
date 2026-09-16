"use client";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  Clock3,
  CreditCard,
  Heart,
  MapPin,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Truck,
  UserRound,
  Workflow,
  X,
} from "lucide-react";
const ps = [
  {
    n: "Papaiz Smart Lock SL100",
    c: "ASSA ABLOY · Papaiz",
    p: 1299.9,
    o: 1499.9,
    pos: "62%",
    tag: "best",
    image: "/papaiz-sl100.jpg",
  },
  {
    n: "Papaiz Smart Lock SL120",
    c: "ASSA ABLOY · Papaiz",
    p: 1149.9,
    o: 1299.9,
    pos: "80%",
    tag: "new",
    image: "/papaiz-sl120.jpg",
  },
  {
    n: "Yale YMI 70A",
    c: "ASSA ABLOY · Yale",
    p: 1899.9,
    o: 2199.9,
    pos: "93%",
    tag: "featured",
    image: "/yale-ymi70a.jpg",
  },
] as const;
type Locale = "pt" | "en" | "es";
type WorkflowEvent =
  | "carrinho_abandonado"
  | "pagamento_aprovado"
  | "pedido_caminho";
const translations = {
  pt: {
    language: "Idioma",
    demoTitle: "Demo Voll Workflows",
    demoSubtitle: "Jornadas de compra e pós-venda",
    abandoned: "Carrinho abandonado",
    trackOrder: "Acompanhar pedido",
    restartDemo: "Reiniciar demo",
    navProducts: "Produtos",
    navSolutions: "Soluções",
    navOffers: "Ofertas",
    navSupport: "Suporte",
    heroEyebrow: "Tecnologia para uma casa mais segura",
    heroTitle: "Sua casa inteligente começa pela porta.",
    heroText:
      "Controle o acesso, receba visitas e proteja quem importa — de qualquer lugar.",
    heroButton: "Conhecer produtos",
    freeShipping: "Frete grátis",
    warranty: "2 anos de garantia",
    catalogEyebrow: "ESCOLHAS PARA SUA CASA",
    bestSellers: "Mais vendidos",
    seeAll: "Ver todos →",
    installments: "em até 10x sem juros",
    addToCart: "Adicionar ao carrinho",
    cartEyebrow: "SEU CARRINHO",
    cartTitle: "Quase tudo pronto",
    shippingTitle: "Você ganhou frete grátis",
    shippingText: "Entrega para todo o Brasil",
    productColor: "Preta · Porta de 30 a 50 mm",
    subtotal: "Subtotal",
    coupon: "Cupom CASA10",
    total: "Total",
    checkout: "Finalizar compra",
    simulateAbandonment: "Simular abandono de carrinho",
    cartNote:
      "Finalize a compra para demonstrar as notificações de pagamento e entrega.",
    workflows: "VOLL WORKFLOWS",
    deliveryTitle: "Notificações do pedido",
    recoveryTitle: "Recuperação de carrinho",
    running: "Workflow em execução",
    customerUpdated: "Cliente atualizado",
    recovered: "Conversão recuperada",
    ready: "Pronto para iniciar",
    paid: "PAGO",
    cartStatus: "CARRINHO",
    order: "Pedido #CS-2048",
    allSent: "Todas as notificações foram enviadas",
    customerInformed: "Cliente informado em cada etapa do pedido",
    orderRecovered: "Pedido recuperado com sucesso",
    conversionAttributed: "Conversão atribuída ao Voll Workflows",
    executeAgain: "Fechar",
    startSimulation: "Iniciar simulação",
    executing: "Executando automação...",
    processing: "Processando...",
    paidMessageTitle: "Pagamento aprovado ✅",
    paidMessage:
      "Recebemos seu pagamento. Já estamos preparando o pedido #CS-2048.",
    routeMessageTitle: "Seu pedido está a caminho 🚚",
    routeMessage: "Acompanhe a entrega pelo código BR2048VOLL.",
    best: "Mais vendido",
    new: "Novo",
    featured: "Destaque",
    wait: "Aguardar 15 minutos",
    waitDesc: "Janela inteligente de conversão",
    abandonEvent: "Disparar carrinho abandonado",
    abandonEventDesc: "Evento enviado ao Voll Workflows",
    couponLink: "Link com cupom aplicado",
    couponUrl:
      "https://voll-commerce-workflows.voll-solutio-3673.chatgpt.site/checkout?cupom=CASA10",
    saleComplete: "Venda concluída",
    saleCompleteDesc: "Pedido #CS-2048 criado",
    paymentApproved: "Pagamento aprovado",
    paymentApprovedDesc: "Notificação enviada por WhatsApp",
    orderOnWay: "Pedido a caminho",
    orderOnWayDesc: "Previsão de entrega: hoje, 18h",
    powered: "POWERED BY VOLL SOLUTIONS",
  },
  en: {
    language: "Language",
    demoTitle: "Voll Workflows Demo",
    demoSubtitle: "Purchase and post-sale journeys",
    abandoned: "Abandoned cart",
    trackOrder: "Track order",
    restartDemo: "Restart demo",
    navProducts: "Products",
    navSolutions: "Solutions",
    navOffers: "Offers",
    navSupport: "Support",
    heroEyebrow: "Technology for a safer home",
    heroTitle: "Your smart home starts at the door.",
    heroText:
      "Control access, welcome visitors and protect those who matter — from anywhere.",
    heroButton: "Explore products",
    freeShipping: "Free shipping",
    warranty: "2-year warranty",
    catalogEyebrow: "CHOICES FOR YOUR HOME",
    bestSellers: "Best sellers",
    seeAll: "See all →",
    installments: "up to 10 interest-free payments",
    addToCart: "Add to cart",
    cartEyebrow: "YOUR CART",
    cartTitle: "Almost ready",
    shippingTitle: "You earned free shipping",
    shippingText: "Delivery throughout Brazil",
    productColor: "Black · 30 to 50 mm door",
    subtotal: "Subtotal",
    coupon: "CASA10 coupon",
    total: "Total",
    checkout: "Checkout",
    simulateAbandonment: "Simulate abandoned cart",
    cartNote:
      "Complete the purchase to demonstrate payment and delivery notifications.",
    workflows: "VOLL WORKFLOWS",
    deliveryTitle: "Order notifications",
    recoveryTitle: "Cart recovery",
    running: "Workflow running",
    customerUpdated: "Customer updated",
    recovered: "Conversion recovered",
    ready: "Ready to start",
    paid: "PAID",
    cartStatus: "CART",
    order: "Order #CS-2048",
    allSent: "All notifications were sent",
    customerInformed: "Customer informed at every order stage",
    orderRecovered: "Order recovered successfully",
    conversionAttributed: "Conversion attributed to Voll Workflows",
    executeAgain: "Close",
    startSimulation: "Start simulation",
    executing: "Running automation...",
    processing: "Processing...",
    paidMessageTitle: "Payment approved ✅",
    paidMessage: "We received your payment. We are preparing order #CS-2048.",
    routeMessageTitle: "Your order is on the way 🚚",
    routeMessage: "Track the delivery with code BR2048VOLL.",
    best: "Best seller",
    new: "New",
    featured: "Featured",
    wait: "Wait 15 minutes",
    waitDesc: "Smart conversion window",
    abandonEvent: "Trigger abandoned cart",
    abandonEventDesc: "Event sent to Voll Workflows",
    couponLink: "Coupon link applied",
    couponUrl:
      "https://voll-commerce-workflows.voll-solutio-3673.chatgpt.site/checkout?coupon=CASA10",
    saleComplete: "Sale completed",
    saleCompleteDesc: "Order #CS-2048 created",
    paymentApproved: "Payment approved",
    paymentApprovedDesc: "Notification sent by WhatsApp",
    orderOnWay: "Order on the way",
    orderOnWayDesc: "Estimated delivery: today, 6 PM",
    powered: "POWERED BY VOLL SOLUTIONS",
  },
  es: {
    language: "Idioma",
    demoTitle: "Demo Voll Workflows",
    demoSubtitle: "Recorridos de compra y posventa",
    abandoned: "Carrito abandonado",
    trackOrder: "Seguir pedido",
    restartDemo: "Reiniciar demo",
    navProducts: "Productos",
    navSolutions: "Soluciones",
    navOffers: "Ofertas",
    navSupport: "Soporte",
    heroEyebrow: "Tecnología para un hogar más seguro",
    heroTitle: "Tu hogar inteligente comienza en la puerta.",
    heroText:
      "Controla el acceso, recibe visitas y protege a quienes importan — desde cualquier lugar.",
    heroButton: "Ver productos",
    freeShipping: "Envío gratis",
    warranty: "2 años de garantía",
    catalogEyebrow: "ELECCIONES PARA TU HOGAR",
    bestSellers: "Más vendidos",
    seeAll: "Ver todos →",
    installments: "hasta 10 cuotas sin intereses",
    addToCart: "Añadir al carrito",
    cartEyebrow: "TU CARRITO",
    cartTitle: "Casi todo listo",
    shippingTitle: "Has ganado el envío gratis",
    shippingText: "Entrega en todo Brasil",
    productColor: "Negra · Puerta de 30 a 50 mm",
    subtotal: "Subtotal",
    coupon: "Cupón CASA10",
    total: "Total",
    checkout: "Finalizar compra",
    simulateAbandonment: "Simular abandono de carrito",
    cartNote:
      "Finaliza la compra para demostrar las notificaciones de pago y entrega.",
    workflows: "VOLL WORKFLOWS",
    deliveryTitle: "Notificaciones del pedido",
    recoveryTitle: "Recuperación de carrito",
    running: "Workflow en ejecución",
    customerUpdated: "Cliente actualizado",
    recovered: "Conversión recuperada",
    ready: "Listo para comenzar",
    paid: "PAGADO",
    cartStatus: "CARRITO",
    order: "Pedido #CS-2048",
    allSent: "Se enviaron todas las notificaciones",
    customerInformed: "Cliente informado en cada etapa del pedido",
    orderRecovered: "Pedido recuperado con éxito",
    conversionAttributed: "Conversión atribuida a Voll Workflows",
    executeAgain: "Cerrar",
    startSimulation: "Iniciar simulación",
    executing: "Ejecutando automatización...",
    processing: "Procesando...",
    paidMessageTitle: "Pago aprobado ✅",
    paidMessage: "Recibimos tu pago. Ya estamos preparando el pedido #CS-2048.",
    routeMessageTitle: "Tu pedido está en camino 🚚",
    routeMessage: "Sigue la entrega con el código BR2048VOLL.",
    best: "Más vendido",
    new: "Nuevo",
    featured: "Destacado",
    wait: "Esperar 15 minutos",
    waitDesc: "Ventana inteligente de conversión",
    abandonEvent: "Activar carrito abandonado",
    abandonEventDesc: "Evento enviado a Voll Workflows",
    couponLink: "Enlace con cupón aplicado",
    couponUrl:
      "https://voll-commerce-workflows.voll-solutio-3673.chatgpt.site/checkout?coupon=CASA10",
    saleComplete: "Venta completada",
    saleCompleteDesc: "Pedido #CS-2048 creado",
    paymentApproved: "Pago aprobado",
    paymentApprovedDesc: "Notificación enviada por WhatsApp",
    orderOnWay: "Pedido en camino",
    orderOnWayDesc: "Entrega prevista: hoy, 18:00",
    powered: "POWERED BY VOLL SOLUTIONS",
  },
} as const;
const customerInfo = {
  pt: {
    name: "Ricardo Martins",
    address: "Av. Paulista, 1000 · São Paulo - SP",
    phoneLabel: "Telefone",
  },
  en: {
    name: "Ricardo Martins",
    address: "1000 Paulista Avenue · São Paulo, Brazil",
    phoneLabel: "Phone",
  },
  es: {
    name: "Ricardo Martins",
    address: "Av. Paulista, 1000 · São Paulo, Brasil",
    phoneLabel: "Teléfono",
  },
} as const;
type Copy = (typeof translations)[Locale];
const makeRecoverySteps = (t: Copy) =>
  [
    [t.wait, t.waitDesc, Clock3],
    [t.abandonEvent, t.abandonEventDesc, ShoppingBag],
    [t.couponLink, t.couponUrl, Check],
  ] as const;
const makeDeliverySteps = (t: Copy) =>
  [
    [t.saleComplete, t.saleCompleteDesc, ShoppingBag],
    [t.paymentApproved, t.paymentApprovedDesc, CreditCard],
    [t.orderOnWay, t.orderOnWayDesc, MapPin],
  ] as const;
const brl = (v: number, locale: Locale) =>
  v.toLocaleString(
    locale === "en" ? "en-US" : locale === "es" ? "es-ES" : "pt-BR",
    { style: "currency", currency: "BRL" },
  );
export function CommercePage({ locale = "pt" }: { locale?: Locale }) {
  const t = translations[locale];
  const customer = customerInfo[locale];
  const [cart, setCart] = useState(false),
    [selected, setSelected] = useState(0),
    [flow, setFlow] = useState(false),
    [run, setRun] = useState(false),
    [step, setStep] = useState(-1),
    [qty, setQty] = useState(1),
    [scenario, setScenario] = useState<"recovery" | "delivery">("recovery"),
    [sending, setSending] = useState<WorkflowEvent | null>(null),
    [apiError, setApiError] = useState(""),
    [customerPhone, setCustomerPhone] = useState("5511989785888"),
    [processingStep, setProcessingStep] = useState<number | null>(null);
  const maxStep = 2;
  const advance = () =>
    setStep((v) => {
      const n = Math.min(maxStep, v + 1);
      if (n === maxStep) setRun(false);
      return n;
    });
  const start = (kind: "recovery" | "delivery" = scenario) => {
    setScenario(kind);
    setCart(false);
    setFlow(true);
    setStep(-1);
    setRun(true);
    setApiError("");
  };
  const resetDemo = () => {
    setCart(false);
    setFlow(false);
    setRun(false);
    setStep(-1);
    setScenario("recovery");
    setSelected(0);
    setQty(1);
    setSending(null);
    setProcessingStep(null);
    setApiError("");
    setCustomerPhone("5511989785888");
  };
  useEffect(() => {
    const context = (
      document as unknown as {
        modelContext?: {
          registerTool: (
            tool: unknown,
            options: { signal: AbortSignal },
          ) => void;
        };
      }
    ).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    context.registerTool(
      {
        name: "start_order_workflow_demo",
        title: t.demoTitle,
        description: t.demoSubtitle,
        inputSchema: {
          type: "object",
          properties: {
            scenario: { type: "string", enum: ["recovery", "delivery"] },
          },
          required: ["scenario"],
          additionalProperties: false,
        },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute: (input: unknown) => {
          const kind =
            (input as { scenario: string }).scenario === "delivery"
              ? "delivery"
              : "recovery";
          start(kind);
          return { status: "started", workflow: kind };
        },
      },
      { signal: lifecycle.signal },
    );
    return () => lifecycle.abort();
  }, []);
  const product = ps[selected],
    sub = product.p * qty,
    done = step === maxStep,
    total = scenario === "recovery" && done ? sub * 0.9 : sub,
    currentSteps =
      scenario === "delivery" ? makeDeliverySteps(t) : makeRecoverySteps(t);
  const eventForStep = (
    kind: "recovery" | "delivery",
    index: number,
  ): WorkflowEvent | null =>
    kind === "recovery" && index === 1
      ? "carrinho_abandonado"
      : kind === "delivery" && index === 1
        ? "pagamento_aprovado"
        : kind === "delivery" && index === 2
          ? "pedido_caminho"
          : null;
  const triggerEvent = async (event: WorkflowEvent) => {
    setSending(event);
    setApiError("");
    try {
      const response = await fetch("/api/workflow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "WHATSAPP",
          whatsapp: customerPhone.replace(/\D/g, ""),
          event,
          cart: `${product.n}${qty > 1 ? ` x${qty}` : ""}`,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      if (!response.ok)
        throw new Error(
          result.error ||
            `Workflow request failed with HTTP ${response.status}.`,
        );
      return true;
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Unable to trigger workflow.",
      );
      return false;
    } finally {
      setSending(null);
    }
  };
  const handleStepClick = async (index: number) => {
    if (index !== step + 1 || sending || processingStep !== null) return;
    setProcessingStep(index);
    const event = eventForStep(scenario, index);
    if (event && !(await triggerEvent(event))) {
      setProcessingStep(null);
      return;
    }
    if (!event) await new Promise((resolve) => setTimeout(resolve, 650));
    advance();
    setProcessingStep(null);
  };
  return (
    <main>
      <div className="demo">
        <div>
          <Workflow />
          <b>{t.demoTitle}</b>
          <span>{t.demoSubtitle}</span>
        </div>
        <section>
          <button onClick={() => start("recovery")}>{t.abandoned}</button>
          <button onClick={() => start("delivery")}>
            {t.trackOrder} <ArrowRight />
          </button>
          <button className="restart" onClick={resetDemo}>
            <RotateCcw /> {t.restartDemo}
          </button>
        </section>
      </div>
      <header>
        <a className="brand" href={locale === "pt" ? "/" : `/${locale}`}>
          <img
            className="logoImage"
            src="/voll-commerce-logo.png"
            alt="Voll Commerce"
          />
        </a>
        <small className="powered">{t.powered}</small>
        <nav>
          <a href="#produtos">{t.navProducts}</a>
          <a href="#">{t.navSolutions}</a>
          <a href="#">{t.navOffers}</a>
          <a href="#">{t.navSupport}</a>
        </nav>
        <div className="languages" aria-label={t.language}>
          <a className={locale === "pt" ? "active" : ""} href="/">
            PT
          </a>
          <a className={locale === "en" ? "active" : ""} href="/en">
            EN
          </a>
          <a className={locale === "es" ? "active" : ""} href="/es">
            ES
          </a>
        </div>
        <div className="tools">
          <button className="ico">
            <Search />
          </button>
          <button className="ico desk" aria-label={customer.name} onClick={() => setFlow(true)}>
            <UserRound />
          </button>
          <button className="bag" onClick={() => setCart(true)}>
            <ShoppingBag />
            <i>1</i>
          </button>
        </div>
      </header>
      <section className="hero">
        <img src="/papaiz-sl120.jpg" alt={t.heroEyebrow} />
        <div className="heroText">
          <em>
            <ShieldCheck /> {t.heroEyebrow}
          </em>
          <h1>{t.heroTitle}</h1>
          <p>{t.heroText}</p>
          <a href="#produtos">
            {t.heroButton} <ArrowRight />
          </a>
          <div className="benefits">
            <span>
              <Truck /> {t.freeShipping}
            </span>
            <span>
              <ShieldCheck /> {t.warranty}
            </span>
          </div>
        </div>
      </section>
      <section className="catalog" id="produtos">
        <div className="heading">
          <div>
            <em>{t.catalogEyebrow}</em>
            <h2>{t.bestSellers}</h2>
          </div>
          <a href="#">{t.seeAll}</a>
        </div>
        <div className="products">
          {ps.map((p) => (
            <article key={p.n}>
              <div className="photo">
                <b>{t[p.tag]}</b>
                <button>
                  <Heart />
                </button>
                <img
                  src={p.image}
                  alt={p.n}
                  style={{ objectPosition: p.pos }}
                />
              </div>
              <small>{p.c}</small>
              <h3>{p.n}</h3>
              <div className="rating">
                ★★★★★ <span>(4,9)</span>
              </div>
              <s>{brl(p.o, locale)}</s>
              <strong>{brl(p.p, locale)}</strong>
              <p>{t.installments}</p>
              <button
                className="add"
                onClick={() => {
                  setSelected(ps.indexOf(p));
                  setQty(1);
                  setCart(true);
                }}
              >
                <ShoppingBag /> {t.addToCart}
              </button>
            </article>
          ))}
        </div>
      </section>
      <button className="whats">
        <MessageCircle />
      </button>
      {cart && <button className="shade" onClick={() => setCart(false)} />}
      <aside className={`drawer ${cart ? "open" : ""}`}>
        <div className="top">
          <div>
            <em>{t.cartEyebrow}</em>
            <h2>{t.cartTitle}</h2>
          </div>
          <button className="ico" onClick={() => setCart(false)}>
            <X />
          </button>
        </div>
        <div className="shipping">
          <Truck />
          <div>
            <b>{t.shippingTitle}</b>
            <span>{t.shippingText}</span>
          </div>
        </div>
        <div className="item">
          <div>
            <img src={product.image} alt={product.n} />
          </div>
          <section>
            <b>{product.n}</b>
            <small>{t.productColor}</small>
            <strong>{brl(product.p, locale)}</strong>
            <nav>
              <button onClick={() => setQty(Math.max(1, qty - 1))}>
                <Minus />
              </button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>
                <Plus />
              </button>
            </nav>
          </section>
        </div>
        <div className="summary">
          <p>
            <span>{t.subtotal}</span>
            <b>{brl(sub, locale)}</b>
          </p>
          {scenario === "recovery" && done && (
            <p className="discount">
              <span>{t.coupon}</span>
              <b>− {brl(sub * 0.1, locale)}</b>
            </p>
          )}
          <p className="total">
            <span>{t.total}</span>
            <b>{brl(total, locale)}</b>
          </p>
        </div>
        <button className="checkout" onClick={() => start("delivery")}>
          {t.checkout} <ArrowRight />
        </button>
        <button className="abandon" onClick={() => start("recovery")}>
          <Workflow /> {t.simulateAbandonment}
        </button>
        <small className="note">{t.cartNote}</small>
      </aside>
      {flow && (
        <button
          className="shade flowShade"
          onClick={() => !run && setFlow(false)}
        />
      )}
      <aside className={`flow ${flow ? "open" : ""}`}>
        <div className="flowTop">
          <i>V</i>
          <div>
            <em>{t.workflows}</em>
            <h2>
              {scenario === "delivery" ? t.deliveryTitle : t.recoveryTitle}
            </h2>
          </div>
          <button className="ico" onClick={() => setFlow(false)}>
            <X />
          </button>
        </div>
        <div className={`status ${run ? "running" : done ? "done" : ""}`}>
          <i />
          {processingStep !== null
            ? t.processing
            : run
            ? t.running
            : done
              ? scenario === "delivery"
                ? t.customerUpdated
                : t.recovered
              : t.ready}
        </div>
        {apiError && <div className="apiError">{apiError}</div>}
        <div className="customer">
          <i>AM</i>
          <div>
            <b>{customer.name}</b>
            <span>{customer.address}</span>
            <label className="customerPhone">
              {customer.phoneLabel}
              <input
                id="customer-phone"
                type="tel"
                inputMode="numeric"
                value={customerPhone}
                onChange={(event) => setCustomerPhone(event.target.value)}
                aria-label={customer.phoneLabel}
              />
            </label>
            {scenario === "delivery" && <small className="orderRef">{t.order}</small>}
          </div>
          <section>
            <small>{scenario === "delivery" ? t.paid : t.cartStatus}</small>
            <b>{brl(sub, locale)}</b>
          </section>
        </div>
        {scenario === "delivery" && (
          <div className="messages">
            <p className={step < 1 ? "waiting" : ""}>
              <MessageCircle />
              <span>
                <b>{t.paidMessageTitle}</b>
                {t.paidMessage}
              </span>
            </p>
            <p className={step < 2 ? "waiting" : ""}>
              <MessageCircle />
              <span>
                <b>{t.routeMessageTitle}</b>
                {t.routeMessage}
              </span>
            </p>
          </div>
        )}
        <div className="timeline">
          {currentSteps.map(([title, d, Icon], i) => (
            <button
              type="button"
              className={`event ${i <= step ? "complete" : ""} ${run && i === step ? "active" : ""}`}
              key={title}
              onClick={() => handleStepClick(i)}
              disabled={
                processingStep !== null ||
                sending !== null ||
                (i !== step + 1 && i > step)
              }
            >
              <i>{i < step ? <Check /> : <Icon />}</i>
              <div>
                <b>{processingStep === i ? t.processing : title}</b>
                <span>{d}</span>
              </div>
              {processingStep === i ||
              (sending && eventForStep(scenario, i) === sending) ? (
                <mark />
              ) : (
                run && i === step && <mark />
              )}
            </button>
          ))}
        </div>
        {done && (
          <div className="success">
            <Check />
            <div>
              <b>{scenario === "delivery" ? t.allSent : t.orderRecovered}</b>
              <span>
                {scenario === "delivery"
                  ? t.customerInformed
                  : t.conversionAttributed}
              </span>
            </div>
          </div>
        )}
        <button
          className="run"
          disabled={run}
          onClick={() => (done ? setFlow(false) : start())}
        >
          {run ? (
            <>
              <i /> {t.executing}
            </>
          ) : (
            <>
              {done ? <X /> : <RotateCcw />} {done ? t.executeAgain : t.startSimulation}
            </>
          )}
        </button>
      </aside>
    </main>
  );
}
export default function Home() {
  return <CommercePage />;
}
