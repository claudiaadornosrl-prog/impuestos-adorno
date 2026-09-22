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
      ],
    },
    {
      icon: '📅', titulo: 'Mensual · cargar lo que informa el estudio',
      desc: 'Un importe por impuesto y por mes. El módulo lo reparte por unidad con la regla de cada impuesto, y la planilla de Gastos lo levanta de acá.',
      pasos: [
        'Elegí mes y año. Por cada impuesto hay un renglón: importe del mes, vencimiento y fecha de pago (opcionales). Guardar es por renglón.',
        'Ingresos Brutos se reparte por la venta de cada local del mes (misma fórmula que tenía la planilla: importe × venta del local / total ventas).',
        'Cargas sociales NO se cargan: salen solas como el 55 % del sueldo banco de cada unidad (RRHH). Si el estudio informa otro %, se cambia en 📇 Impuestos.',
        'Impuesto al débito y al crédito van enteros a Administración.',
        'Abajo, "Cómo queda repartido" muestra el resultado unidad por unidad con el cálculo al lado. Es exactamente lo que va a ver la planilla de Gastos.',
        'En modo 🧪 prueba (franja amarilla) los importes se guardan aparte y no mezclan con los reales.',
      ],
    },
    {
      icon: '📇', titulo: 'Impuestos · el catálogo y su regla',
      desc: 'Solo el admin. Cada impuesto dice a qué categoría de la planilla va y cómo se reparte.',
      pasos: [
        'Reparto "ventas": proporcional a la venta de cada local. "sueldo_banco": un % del sueldo banco de cada unidad. "unidad_fija": todo a una. "manual": se carga un importe por unidad en 📅 Mensual.',
        '"Solo estas unidades" limita el reparto (ej. alcorta, unicenter). Vacío = todas.',
        'Desactivar un impuesto lo saca del reparto de los meses siguientes; los ya cargados quedan.',
      ],
    },
    {
      icon: '🧾', titulo: 'Vencimientos',
      desc: 'Lista de todo lo que tiene vencimiento cargado, con su estado.',
      pasos: [
        'Pendiente, Vencido (pasó la fecha sin fecha de pago) o Pagado. Se completan desde 📅 Mensual.',
        'Preparado para que más adelante se suban los VEPs del estudio y se controle contra lo pagado.',
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
          <div style="font-weight:700;font-size:16px;">Manual · Documentos</div>
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
  ov.addEventListener('click', e => { if (e.target === ov) cerrarManual(); });
  document.body.appendChild(ov);
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

  const nav = document.querySelector('nav.tabs');
  if (nav) {
    const b = document.createElement('button');
    b.textContent = '📖 Manual';
    b.onclick = () => abrirManual();
    nav.appendChild(b);
  }
})();
