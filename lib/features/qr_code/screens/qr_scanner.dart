// import 'package:flutter/material.dart';
// import 'package:qr_code_scanner/qr_code_scanner.dart';

// class QRScannerPage extends StatefulWidget {
//   @override
//   _QRScannerPageState createState() => _QRScannerPageState();
// }

// class _QRScannerPageState extends State<QRScannerPage> {
//   final GlobalKey qrKey = GlobalKey(debugLabel: 'QR');
//   QRViewController? controller;
//   String result = "";

//   @override
//   void dispose() {
//     controller?.dispose();
//     super.dispose();
//   }

//   // Function to open the scanner when the button is clicked
//   void _openScanner(BuildContext context) async {
//     // Show the scanner when the button is pressed
//     await Navigator.push(
//       context,
//       MaterialPageRoute(
//         builder: (context) => QRScannerView(
//           onQRScan: (scanResult) {
//             setState(() {
//               result = scanResult;
//             });
//           },
//         ),
//       ),
//     );

//     // After returning from the scanner, show the result in a dialog
//     if (result.isNotEmpty) {
//       showDialog(
//         context: context,
//         builder: (context) {
//           return AlertDialog(
//             title: Text("QR Code Scanned"),
//             content: Text(
//                 "Scanned result: $result\n\nFunctionality is still being developed."),
//             actions: <Widget>[
//               TextButton(
//                 onPressed: () {
//                   Navigator.of(context).pop();
//                 },
//                 child: Text("OK"),
//               ),
//             ],
//           );
//         },
//       );
//     }
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('QR Code Scanner'),
//       ),
//       body: Center(
//         child: ElevatedButton(
//           onPressed: () =>
//               _openScanner(context), // Open scanner when button is pressed
//           child: Text('Open Scanner'),
//         ),
//       ),
//     );
//   }
// }

// class QRScannerView extends StatelessWidget {
//   final Function(String) onQRScan;

//   const QRScannerView({Key? key, required this.onQRScan}) : super(key: key);

//   @override
//   Widget build(BuildContext context) {
//     return Scaffold(
//       appBar: AppBar(
//         title: Text('Scan QR Code'),
//       ),
//       body: QRView(
//         key: GlobalKey(),
//         onQRViewCreated: (controller) {
//           controller.scannedDataStream.listen((scanData) {
//             onQRScan(scanData.code ?? "");
//             Navigator.pop(context); // Close scanner after scanning
//           });
//         },
//       ),
//     );
//   }
// }
