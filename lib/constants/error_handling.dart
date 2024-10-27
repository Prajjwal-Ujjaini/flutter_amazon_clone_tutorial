import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

import 'utils.dart';

void httpErrorHandle({
  required http.Response response,
  required BuildContext context,
  required VoidCallback onSuccess,
}) {
  print('httpErrorHandle called');
  switch (response.statusCode) {
    case 200:
      onSuccess();
      break;
    case 400:
      print('msg : ${jsonDecode(response.body)['msg']}');
      showSnackBar(context, jsonDecode(response.body)['msg']);
      break;
    case 500:
      print('error : ${jsonDecode(response.body)['error']}');
      showSnackBar(context, jsonDecode(response.body)['error']);
      break;
    default:
      showSnackBar(context, response.body);
  }
}
