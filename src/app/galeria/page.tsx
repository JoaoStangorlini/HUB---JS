/*
 * Este programa é um software livre; você pode redistribuí-lo e/ou 
 * modificá-lo sob os termos da Licença Pública Geral GNU Affero (AGPLv3).
 */
export default function GaleriaPage() {
  return (
    <div className="flex-1 w-full h-[calc(100vh-68px)]">
      <iframe 
        src="https://stangorliniphotography.pic-time.com/-portiflio/slidesblog/6a1cf17dfd03398d7fddb00d?slideshowview=AAAAANYAAABdtAdQQXgvsHwiv1E6mUSMuiUAaFz7JkxgkxMPtvfv0JMhf8GQnlaaNiCsf9oYGmXGq7VPHE3RyL2-1gnGziP0iVtidPlPKhb4rzJeFOAgYQ" 
        className="w-full h-full border-none"
        title="Galeria Pic-Time"
        allowFullScreen
      />
    </div>
  );
}
