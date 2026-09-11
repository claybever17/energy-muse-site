import Foundation
import Vision
import CoreImage
import AppKit

// usage: cutout <out-dir> <image>... ; writes <out-dir>/<name>.png with the subject on transparent
let args = CommandLine.arguments
guard args.count >= 3 else { fputs("usage: cutout outdir img...\n", stderr); exit(1) }
let outDir = args[1]
let ctx = CIContext()
for path in args[2...] {
    let url = URL(fileURLWithPath: path)
    guard let ci = CIImage(contentsOf: url) else { print("SKIP \(path) unreadable"); continue }
    let req = VNGenerateForegroundInstanceMaskRequest()
    let handler = VNImageRequestHandler(ciImage: ci, options: [:])
    do { try handler.perform([req]) } catch { print("FAIL \(path) \(error)"); continue }
    guard let obs = req.results?.first else { print("NONE \(path)"); continue }
    do {
        let masked = try obs.generateMaskedImage(ofInstances: obs.allInstances, from: handler, croppedToInstancesExtent: false)
        let out = CIImage(cvPixelBuffer: masked)
        let name = url.deletingPathExtension().lastPathComponent
        let dst = URL(fileURLWithPath: outDir).appendingPathComponent(name + ".png")
        let cs = CGColorSpace(name: CGColorSpace.sRGB)!
        try ctx.writePNGRepresentation(of: out, to: dst, format: .RGBA8, colorSpace: cs, options: [:])
        print("OK \(name) instances=\(obs.allInstances.count)")
    } catch { print("FAIL \(path) \(error)") }
}
