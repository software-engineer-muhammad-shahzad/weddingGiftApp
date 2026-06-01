export const downloadQRCode = (canvasId: string, fileName: string): void => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement
    if (!canvas) {
        console.error("Canvas not found with id:", canvasId)
        return
    }
    const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
    const link = document.createElement("a")
    link.href = pngUrl
    link.download = `${fileName}-qr-code.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}