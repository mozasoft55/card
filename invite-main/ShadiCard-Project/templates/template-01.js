const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export default function render({ guest, wedding: w, events = [] }) {
  const bride = esc(w.bride_name || 'Bride');
  const groom = esc(w.groom_name || 'Groom');

  return `
    <div class="card-wrapper">
      <div style="border: 4px double var(--accent); padding: 30px 18px; text-align: center; background: rgba(255,255,255,0.7); border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
        <p style="text-transform: uppercase; letter-spacing: 2px; font-size: 12px; margin: 0 0 16px 0; color: var(--accent); font-weight: bold;">
          ${esc(w.invocation || '|| Shree Ganeshaya Namah ||')}
        </p>

        <div style="background: rgba(201,162,74,0.12); padding: 8px 12px; border-radius: 6px; margin-bottom: 20px;">
          <small style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Cordially Invited</small>
          <h3 style="margin: 4px 0 0 0; color: var(--primary); font-size: 18px;">${esc(guest.name)} ${guest.with_family ? '& Family' : ''}</h3>
        </div>

        <p style="font-size: 14px; font-style: italic; margin-bottom: 16px;">
          ${esc(w.host_name || 'The Family')} solicit your gracious presence at the wedding ceremony of
        </p>

        <h1 style="font-size: 38px; margin: 0; color: var(--primary);">${bride}</h1>
        <p style="margin: 6px 0; font-size: 13px; letter-spacing: 3px; font-weight: bold;">WEDS</p>
        <h1 style="font-size: 38px; margin: 0; color: var(--primary);">${groom}</h1>

        <div style="margin: 24px 0; border-top: 1px solid var(--accent); border-bottom: 1px solid var(--accent); padding: 12px 0;">
          <div style="font-size: 16px; font-weight: bold;">${esc(w.date)}</div>
          <div style="font-size: 14px;">${esc(w.time)} onwards</div>
        </div>

        <div style="margin-bottom: 24px;">
          <strong>${esc(w.venue)}</strong>
          <p style="font-size: 13px; margin: 4px 0 12px 0; opacity: 0.85;">${esc(w.address)}</p>
          ${w.map_url ? `<a href="${esc(w.map_url)}" target="_blank" class="gold-btn">GET LOCATION</a>` : ''}
        </div>

        ${events.length ? `
          <div style="text-align: left; background: #fff; padding: 12px; border-radius: 6px; border-left: 3px solid var(--accent); margin-bottom: 20px;">
            <h4 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; color: var(--primary);">Ceremonies</h4>
            ${events.map(ev => `
              <div style="display:flex; justify-content:space-between; font-size: 12px; margin-bottom: 4px;">
                <span><strong>${esc(ev.event_name)}</strong> (${esc(ev.event_date)})</span>
                <span>${esc(ev.event_time)}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <p style="font-size: 11px; margin: 0; opacity: 0.7;">Best Compliments: ${esc(w.compliments || 'Near & Dear Ones')}</p>
      </div>
    </div>
  `;
}