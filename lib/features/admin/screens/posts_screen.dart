import 'package:flutter/material.dart';
import 'package:flutter_amazon_clone_tutorial/features/account/widgets/single_product.dart';
import 'package:flutter_amazon_clone_tutorial/features/admin/screens/add_products_screen.dart';
import 'package:flutter_amazon_clone_tutorial/features/admin/services/admin_services.dart';
import 'package:flutter_amazon_clone_tutorial/models/product_model.dart';

import '../../../common/widgets/loader.dart';

class PostsScreen extends StatefulWidget {
  const PostsScreen({Key? key}) : super(key: key);

  @override
  State<PostsScreen> createState() => _PostsScreenState();
}

class _PostsScreenState extends State<PostsScreen> {
  List<ProductModel>? products;
  final AdminServices adminServices = AdminServices();

  fetchAllProducts() async {
    products = await adminServices.fetchAllProduct(context: context);
    setState(() {});
  }

  @override
  void initState() {
    super.initState();
    fetchAllProducts();
  }

  void navigateToAddProduct() {
    Navigator.pushNamed(context, AddProductScreen.routeName);
  }

  void deletProduct(ProductModel product, int index) {
    adminServices.deletProcuct(
      context: context,
      product: product,
      onSuccess: () {
        products!.removeAt(index);
        setState(() {});
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return products == null
        ? const Loader()
        : Scaffold(
            body: GridView.builder(
                itemCount: products!.length,
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2),
                itemBuilder: (context, index) {
                  final productData = products![index];
                  return Column(
                    children: [
                      SizedBox(
                        height: 140,
                        child: SingleProduct(image: productData.images[0]),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                        children: [
                          Expanded(
                            child: Text(
                              productData.name,
                              overflow: TextOverflow.ellipsis,
                              maxLines: 2,
                            ),
                          ),
                          IconButton(
                            onPressed: () => deletProduct(productData, index),
                            icon: Icon(Icons.delete_outline),
                          ),
                        ],
                      )
                    ],
                  );
                }),
            floatingActionButton: FloatingActionButton.large(
              onPressed: navigateToAddProduct,
              child: const Icon(Icons.add),
              tooltip: 'Add a Product',
            ),
            floatingActionButtonLocation:
                FloatingActionButtonLocation.centerFloat,
          );
  }
}
