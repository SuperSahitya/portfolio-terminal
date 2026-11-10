/** The glass in front of the tube: scanlines, a slow refresh beam, darkened corners. */
export function CrtOverlay() {
  return (
    <div className="crt" aria-hidden="true">
      <div className="crt-beam" />
      <div className="crt-scanlines" />
      <div className="crt-vignette" />
    </div>
  )
}
