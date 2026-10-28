// ═══════════════════════════════════════════════════════════════════════
//  Impuestos Adorno · manual.js — Manual de uso (overlay 📖, autoinyectable)
//  🚨 REGLA: cada vez que se agrega o cambia una función del módulo,
//  actualizar la sección correspondiente acá (y bump del ?v= en index.html).
// ═══════════════════════════════════════════════════════════════════════

function _mEsc(s) {
  return String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function _manualSecciones() {
  return [
    {
      icon: '🔐', titulo: 'Entrar una sola vez',
      desc: 'La sesión se comparte entre todos los módulos del sistema.',
      pasos: [
        'En el Hub, con el ícono 👤, ingresás con tu usuario y podés tildar "Confiar en esta computadora": después entrás a todos los módulos sin volver a escribir la clave.',
        'Al salir de cualquier módulo se cierra la sesión en todos.',
        'Impuestos trabaja siempre con los datos reales (no tiene modo de prueba).',
      ],
    },
    {
      icon: '🗂', titulo: 'Tablero · todos los impuestos del año',
      desc: 'Una fila por impuesto y una columna por mes. Cada cuadrito es una obligación: el impuesto de ese período, con su vencimiento, su DDJJ, su VEP y su pago.',
      pasos: [
        'Colores: verde = pagada · verde punteado = compensada con saldo a favor (no salió plata) · azul = VEP listo · violeta = DDJJ presentada · blanco punteado = a presentar · amarillo = vence en los próximos 10 días · rojo = venció y no hay pago registrado · gris = sin movimiento o no corresponde.',
        'Arriba están los totales: lo pagado en el año, lo que falta pagar (si ya tiene importe), cuántas vencieron sin pago registrado y el próximo vencimiento.',
        '"Ver por Período" pone cada impuesto en el mes al que corresponde (el IVA de septiembre va en septiembre). "Ver por Vencimiento" lo pone en el mes en que vence o se pagó (el IVA de septiembre va en octubre). Las columnas del año anterior o siguiente aparecen solas cuando hace falta.',
        'Una obligación en rojo no siempre está impaga: puede estar pagada y el pago todavía no se asignó. Antes de preocuparte, mirá la pestaña Pagos.',
        'El botón ⊕ agrega una obligación que no está en el calendario (un despacho de aduana, un plan de pagos). El botón de flechas vuelve a sumar los débitos y créditos bancarios desde Tesorería.',
        'La fila "Pagado en el mes" suma lo pagado de cada columna.',
      ],
    },
    {
      icon: '🧾', titulo: 'Cargar la DDJJ, el VEP y el pago',
      desc: 'Tocás el cuadrito de la obligación y se abre su ficha con tres partes. Se cierra con ✕, Cancelar o Escape.',
      pasos: [
        'Declaración jurada: impuesto determinado (lo que dice la DDJJ), saldo a favor que queda, fecha de presentación, número de transacción y el PDF de la DDJJ que manda el estudio (botón de subir).',
        'VEP: número, importe a pagar, vencimiento del VEP y el PDF del VEP.',
        'Pago: fecha, importe pagado y comprobante. Si el pago vino de Tesorería, lo dice y se puede desvincular.',
        'El estado se calcula solo: con fecha de pago queda Pagada; con VEP, VEP listo; con DDJJ, Presentada. "Marcar como" sirve para Sin movimiento (DDJJ en cero), No corresponde o Compensada (se canceló con un saldo a favor, como el IVA 3-2026 y el anticipo 1 contra el saldo de Ganancias 2025).',
        'Si la obligación vino de la carpeta del estudio (DOCUMENTOS/CONTADOR), abajo de la DDJJ aparece el archivo de respaldo: se abre en OneDrive. Por ejemplo, el listado de retenciones de cada quincena.',
        'Para Ingresos Brutos, el impuesto determinado es lo que se reparte a la planilla de Gastos por la venta de cada local.',
        'Los archivos quedan guardados en el sistema (privados, solo para quienes usan Impuestos). Para verlos, tocás el nombre.',
      ],
    },
    {
      icon: '💳', titulo: 'Pagos · lo que salió del banco',
      desc: 'Todos los pagos a ARCA, AGIP y ARBA que aparecen en Tesorería (Galicia y Mercado Pago), para asignarlos a su obligación.',
      pasos: [
        'El número de la pestaña es cuántos pagos faltan asignar en las fechas elegidas.',
        'La sugerencia sale de la nota que dejó administración en Tesorería (por ejemplo "IVA 5-2026" o "2Q Retenciones Ganancias 7-2026"). Con el ✓ la aceptás; con el lápiz la elegís a mano; con el doble tilde de arriba aceptás todas las sugerencias completas.',
        'Si un VEP pagó dos cosas (por ejemplo cargas sociales y la 2Q de retenciones), con el lápiz asignás una parte poniendo el importe, y el resto queda en la lista para asignarlo a la otra.',
        'Cuando la nota no dice nada, el sistema busca una obligación con el mismo importe que vence cerca de la fecha del pago ("Coincide el importe con…"). Funciona muy bien con las retenciones de Ganancias, porque el total de cada quincena ya está cargado.',
        'Lo que no es un impuesto de la SRL (seguros, sindicato, transferencias a proveedores) se marca como ignorado con el círculo tachado. Se puede volver a mostrar desde "Mostrar: Ignorados".',
        'Los débitos y créditos bancarios (Ley 25.413) no aparecen acá: se suman solos por mes y quedan pagados en el Tablero.',
        'Para que la sugerencia funcione, conviene que en Tesorería la nota del pago diga el impuesto y el período (ej. "IVA 9-2026", "Anticipo Ganancias 2026 cuota 5").',
      ],
    },
    {
      icon: '📅', titulo: 'Calendario de vencimientos',
      desc: 'Las fechas de vencimiento de cada impuesto para nuestro CUIT (terminado en 0).',
      pasos: [
        'Las fechas con ✓ salen de la norma oficial (por ejemplo Ingresos Brutos, de la resolución de la Comisión Arbitral). Las demás son estimadas por la regla de cada impuesto: conviene confirmarlas en la agenda de vencimientos de ARCA y tildar ✓.',
        'Cambiar una fecha acá cambia el vencimiento de las obligaciones que no tienen uno propio.',
        'El botón ⊕ agrega un vencimiento (por ejemplo los de 2027 cuando salgan, o una prórroga).',
      ],
    },
    {
      icon: '🥧', titulo: 'Reparto a Gastos',
      desc: 'Muestra, mes por mes, qué parte de los impuestos va a cada unidad en la planilla de Gastos.',
      pasos: [
        'Solo van los impuestos que son gasto: Ingresos Brutos (por la venta de cada local), cargas sociales (55 % del sueldo banco de cada unidad) y débitos y créditos bancarios (todo a Administración).',
        'IVA, Ganancias, anticipos y retenciones no son gasto y no se reparten.',
        'Si algún impuesto se configura "a mano por unidad", acá aparece para cargar el importe de cada unidad.',
      ],
    },
    {
      icon: '📇', titulo: 'Impuestos · el catálogo',
      desc: 'Solo el admin. Cada impuesto dice qué organismo lo cobra, cada cuánto vence, quién lo presenta y si va a la planilla de Gastos.',
      pasos: [
        'Planilla de Gastos: "no va", "por venta de cada local", "% del sueldo banco", "todo a una unidad" o "a mano por unidad". Si va, hay que elegir la categoría de la planilla.',
        'Rol: contribuyente (lo pagamos nosotros), agente de retención (lo retenemos a otros, como las retenciones de Ganancias) o por cuenta de terceros (Bienes Personales de los socios).',
        'Desactivar un impuesto lo saca del Tablero y del reparto; lo cargado queda guardado.',
      ],
    },
  ];
}

function abrirManual() {
  if (document.getElementById('manual-overlay')) return;
  const items = _manualSecciones();
  const ov = document.createElement('div');
  ov.id = 'manual-overlay';
  ov.innerHTML = `
    <div class="m-box">
      <div class="m-head">
        <span style="font-size:22px;">📖</span>
        <div style="flex:1;">
          <div style="font-weight:700;font-size:16px;">Manual · Impuestos</div>
          <div style="font-size:12px;opacity:.85;">Guía rápida de cada herramienta del módulo</div>
        </div>
        <button class="m-close" onclick="cerrarManual()">✕</button>
      </div>
      ${items.map((s, i) => `
        <div class="m-sec">
          <div class="m-tit">${s.icon} ${i + 1}. ${_mEsc(s.titulo)}</div>
          <div class="m-desc">${_mEsc(s.desc)}</div>
          <ul class="m-pasos">${s.pasos.map(p => `<li>${_mEsc(p)}</li>`).join('')}</ul>
        </div>`).join('')}
      <div class="m-foot">💡 Este manual se actualiza junto con el sistema. ¿Falta algo o no funciona? Avisale a JP.</div>
    </div>`;
  document.body.appendChild(ov);
  _manualLupa(ov);
  document.body.style.overflow = 'hidden';
}

function cerrarManual() {
  const ov = document.getElementById('manual-overlay');
  if (ov) ov.remove();
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarManual(); });

(function _manualInit() {
  const css = document.createElement('style');
  css.textContent = `
    #manual-overlay{position:fixed;inset:0;background:rgba(15,23,42,.55);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding:20px 12px;overflow-y:auto;-webkit-overflow-scrolling:touch;}
    #manual-overlay .m-box{background:#f8fafc;border-radius:14px;max-width:760px;width:100%;padding-bottom:6px;box-shadow:0 20px 60px rgba(0,0,0,.3);}
    #manual-overlay .m-head{position:sticky;top:0;background:#7c2d12;color:#fff;padding:14px 18px;border-radius:14px 14px 0 0;display:flex;align-items:center;gap:10px;z-index:1;}
    #manual-overlay .m-close{background:rgba(255,255,255,.18);border:none;color:#fff;font-size:16px;border-radius:8px;padding:6px 11px;cursor:pointer;}
    #manual-overlay .m-sec{background:#fff;border:1px solid #e2e8f0;border-left:4px solid #7c2d12;border-radius:10px;margin:14px 14px 0;padding:14px 18px;}
    #manual-overlay .m-tit{font-weight:700;font-size:15px;margin-bottom:4px;color:#5a2110;}
    #manual-overlay .m-desc{font-size:13px;color:#475569;margin-bottom:8px;}
    #manual-overlay .m-pasos{margin:0 0 2px 18px;padding:0;font-size:13px;line-height:1.65;color:#334155;}
    #manual-overlay .m-pasos li{margin-bottom:4px;}
    #manual-overlay .m-foot{margin:16px 14px 12px;background:#fef3c7;border-left:4px solid #d97706;border-radius:8px;padding:11px 14px;font-size:12.5px;color:#92400e;}`;
  document.head.appendChild(css);

  // Botón del manual en la cabecera, solo ícono (regla de diseño JP 21-oct-2026)
  const hr = document.querySelector('header .header-right');
  if (hr && !document.getElementById('btn-manual')) {
    const b = document.createElement('button'); b.id = 'btn-manual'; b.className = 'hbtn'; b.title = 'Manual de uso'; b.setAttribute('aria-label', 'Manual');
    b.innerHTML = '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg><span class="lb">Manual</span>';
    b.onclick = () => abrirManual(); hr.insertBefore(b, hr.querySelector('.hsep'));
  }
})();

// ── 🔍 Lupa del manual (29-sep, pedido Contreras): busca por palabra, sin tildes ni mayúsculas.
//    Deja solo las secciones que la contienen, dentro de ellas los pasos que la contienen,
//    y resalta la palabra. Mismo bloque en todos los módulos (el de RRHH usa _mLupaFiltrar).
function _mLupaNorm(s){ return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase(); }
function _mLupaMarcar(el, q){
  const nodos = [], w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (w.nextNode()) nodos.push(w.currentNode);
  nodos.forEach(n => {
    const t = n.nodeValue; let norm = '', mapa = [];
    for (let i = 0; i < t.length; i++){ const c = _mLupaNorm(t[i]); for (let k = 0; k < c.length; k++){ norm += c[k]; mapa.push(i); } }
    let desde = 0, pos, frag = null, ult = 0;
    while (q && (pos = norm.indexOf(q, desde)) >= 0){
      frag = frag || document.createDocumentFragment();
      const a = mapa[pos], b = mapa[pos + q.length - 1] + 1;
      if (a > ult) frag.appendChild(document.createTextNode(t.slice(ult, a)));
      const m = document.createElement('mark'); m.textContent = t.slice(a, b);
      m.style.cssText = 'background:#fde047;color:inherit;padding:0 1px;border-radius:3px'; frag.appendChild(m);
      ult = b; desde = pos + q.length;
    }
    if (frag){ if (ult < t.length) frag.appendChild(document.createTextNode(t.slice(ult))); n.parentNode.replaceChild(frag, n); }
  });
}
function _mLupaFiltrar(cont, selSec, texto, info){
  if (!cont) return;
  const q = _mLupaNorm(String(texto || '').trim());
  let vistas = 0;
  cont.querySelectorAll(selSec).forEach(sec => {
    if (sec.dataset.mOrig == null) sec.dataset.mOrig = sec.innerHTML; else sec.innerHTML = sec.dataset.mOrig;
    if (!q){ sec.style.display = ''; return; }
    const lis = [...sec.querySelectorAll('li')];
    const enLis = lis.filter(li => _mLupaNorm(li.textContent).includes(q));
    const hay = _mLupaNorm(sec.textContent).includes(q);
    sec.style.display = hay ? '' : 'none';
    if (!hay) return;
    vistas++;
    if (enLis.length) lis.forEach(li => { if (!enLis.includes(li)) li.style.display = 'none'; });
    _mLupaMarcar(sec, q);
  });
  if (info) info.textContent = !q ? '' : vistas ? `${vistas} ${vistas === 1 ? 'sección' : 'secciones'} con «${String(texto).trim()}»` : `No encontré «${String(texto).trim()}» en el manual.`;
  const primera = q && cont.querySelector('mark');
  if (primera) primera.scrollIntoView({block: 'center', behavior: 'smooth'});
}
function _manualLupa(ov){
  const head = ov && ov.querySelector('.m-head'); if (!head) return;
  head.style.flexWrap = 'wrap';
  const box = document.createElement('div');
  box.style.cssText = 'flex-basis:100%;display:flex;gap:8px;align-items:center;margin-top:8px';
  box.innerHTML = '<input type="search" placeholder="🔍 Buscar en el manual (por ej.: equivalencias, remito, echeq)…" '
    + 'style="flex:1;min-width:0;padding:8px 11px;border-radius:9px;border:none;font-size:14px;color:#0f172a;font-family:inherit">'
    + '<span class="m-lupa-info" style="font-size:12px;opacity:.9;white-space:nowrap"></span>';
  head.appendChild(box);
  const inp = box.querySelector('input'), info = box.querySelector('.m-lupa-info');
  let t = null;
  inp.addEventListener('input', () => { clearTimeout(t); t = setTimeout(() => _mLupaFiltrar(ov, '.m-sec', inp.value, info), 250); });
  inp.addEventListener('keydown', e => { if (e.key === 'Escape' && inp.value){ e.stopPropagation(); inp.value = ''; _mLupaFiltrar(ov, '.m-sec', '', info); } });
  setTimeout(() => inp.focus(), 50);
}
