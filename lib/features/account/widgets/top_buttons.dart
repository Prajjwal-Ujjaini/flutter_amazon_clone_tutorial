import 'package:flutter/material.dart';
import 'package:flutter_amazon_clone_tutorial/features/account/widgets/account_button.dart';

class TopBottons extends StatefulWidget {
  const TopBottons({Key? key}) : super(key: key);

  @override
  State<TopBottons> createState() => _TopBottonsState();
}

class _TopBottonsState extends State<TopBottons> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Row(
          children: [
            AccountButton(
              text: 'Your Orders',
              onTab: () {},
            ),
            AccountButton(
              text: 'Turn Seller',
              onTab: () {},
            ),
          ],
        ),
        SizedBox(
          height: 10,
        ),
        Row(
          children: [
            AccountButton(
              text: 'Log Out',
              onTab: () {},
            ),
            AccountButton(
              text: 'Your Wsih List',
              onTab: () {},
            ),
          ],
        )
      ],
    );
  }
}
