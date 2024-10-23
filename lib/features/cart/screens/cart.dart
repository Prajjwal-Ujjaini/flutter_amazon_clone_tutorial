import 'package:flutter/material.dart';

class SearchBarPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Different Search Bar UIs'),
      ),
      body: ListView(
        padding: EdgeInsets.all(16),
        children: [
          buildSectionTitle('1. Basic Search Bar'),
          buildBasicSearchBar(),
          SizedBox(height: 20),
          buildSectionTitle('2. Rounded Search Bar with Shadow'),
          buildRoundedSearchBarWithShadow(),
          SizedBox(height: 20),
          buildSectionTitle('3. Search Bar with Clear Button'),
          buildSearchBarWithClearButton(),
          SizedBox(height: 20),
          buildSectionTitle('4. Search Bar with Underline'),
          buildSearchBarWithUnderline(),
          SizedBox(height: 20),
          buildSectionTitle('5. Search Bar with Custom Border Color'),
          buildSearchBarWithBorderColor(),
          SizedBox(height: 20),
          buildSectionTitle('6. Search Bar with Gradient Background'),
          buildSearchBarWithGradientBackground(),
          SizedBox(height: 20),
          buildSectionTitle('7. Search Bar with Custom Font'),
          buildSearchBarWithCustomFont(),
          SizedBox(height: 20),
          buildSectionTitle('8. Search Bar with Icon Inside Input Field'),
          buildSearchBarWithMicIcon(),
          SizedBox(height: 20),
          buildSectionTitle('9. Search Bar with Circular Button'),
          buildSearchBarWithCircularButton(),
          SizedBox(height: 20),
          buildSectionTitle('10. Animated Width Expansion Search Bar'),
          buildAnimatedWidthSearchBar(),
        ],
      ),
    );
  }

  // Section Title Widget
  Widget buildSectionTitle(String title) {
    return Text(
      title,
      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
    );
  }

  // 1. Basic Search Bar
  Widget buildBasicSearchBar() {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Search...',
        prefixIcon: Icon(Icons.search),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(30),
        ),
      ),
    );
  }

  // 2. Rounded Search Bar with Shadow
  Widget buildRoundedSearchBarWithShadow() {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Search here...',
        prefixIcon: Icon(Icons.search),
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(25),
          borderSide: BorderSide.none,
        ),
        contentPadding: EdgeInsets.all(16),
      ),
      style: TextStyle(color: Colors.black),
    );
  }

  // 3. Search Bar with Clear Button
  Widget buildSearchBarWithClearButton() {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Search...',
        prefixIcon: Icon(Icons.search),
        suffixIcon: IconButton(
          icon: Icon(Icons.clear),
          onPressed: () {
            // Clear search field action
          },
        ),
      ),
    );
  }

  // 4. Search Bar with Underline
  Widget buildSearchBarWithUnderline() {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Search...',
        prefixIcon: Icon(Icons.search),
        border: UnderlineInputBorder(),
      ),
    );
  }

  // 5. Search Bar with Custom Border Color
  Widget buildSearchBarWithBorderColor() {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Search...',
        prefixIcon: Icon(Icons.search),
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(25),
          borderSide: BorderSide(color: Colors.blue),
        ),
      ),
    );
  }

  // 6. Search Bar with Gradient Background
  Widget buildSearchBarWithGradientBackground() {
    return Container(
      decoration: BoxDecoration(
        gradient: LinearGradient(
          colors: [Colors.blue, Colors.purple],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        borderRadius: BorderRadius.circular(25),
      ),
      child: TextField(
        decoration: InputDecoration(
          hintText: 'Search...',
          prefixIcon: Icon(Icons.search, color: Colors.white),
          border: InputBorder.none,
        ),
        style: TextStyle(color: Colors.white),
      ),
    );
  }

  // 7. Search Bar with Custom Font
  Widget buildSearchBarWithCustomFont() {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Search...',
        prefixIcon: Icon(Icons.search),
      ),
      style: TextStyle(fontFamily: 'Roboto', fontSize: 18),
    );
  }

  // 8. Search Bar with Mic Icon
  Widget buildSearchBarWithMicIcon() {
    return TextField(
      decoration: InputDecoration(
        hintText: 'Search...',
        prefixIcon: Icon(Icons.search),
        suffixIcon: Icon(Icons.mic),
      ),
    );
  }

  // 9. Search Bar with Circular Button
  Widget buildSearchBarWithCircularButton() {
    return Row(
      children: [
        Expanded(
          child: TextField(
            decoration: InputDecoration(
              hintText: 'Search...',
              prefixIcon: Icon(Icons.search),
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(25),
              ),
            ),
          ),
        ),
        SizedBox(width: 8),
        FloatingActionButton(
          onPressed: () {},
          child: Icon(Icons.search),
        ),
      ],
    );
  }

  // 10. Animated Width Search Bar
  Widget buildAnimatedWidthSearchBar() {
    return StatefulBuilder(
      builder: (context, setState) {
        bool isSearchExpanded = false;

        return GestureDetector(
          onTap: () {
            setState(() {
              isSearchExpanded = !isSearchExpanded;
            });
          },
          child: AnimatedContainer(
            duration: Duration(milliseconds: 300),
            width: isSearchExpanded ? 300 : 50,
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search...',
                prefixIcon: Icon(Icons.search),
              ),
            ),
          ),
        );
      },
    );
  }
}
