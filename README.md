# YouChoose

## Description:
Sometimes people have trouble choosing when faced with multiple options.  For example, deciding where to go out for dinner can become an unpleasant ordeal because no one can agree on one restaurant.  This project will be a web utility that helps people pick from multiple options at random.  The users will be able to enter a list of any number of things, then press a button and the application will choose and display one of the items.  We often have the most trouble choosing from sets of options that we have to choose from regularly as well, so this application will also allow the user to save their lists and use them again later. 

## Table of Contents
Project Name\
Description\
Table of Contents\
Installation\
Usage\
Contributing\
Credits\
License

## Installation
Prerequisites:
- Have node installed on your computer

Steps:
1) Clone the repository
2) Edit the config.json file in the you-choose-api folder to connect to your own database
3) Open a ternmial and navigate to the you-choose-api folder, run "npm-start", and you should see a message saying "Listening on Port: 3001"
4) Open a second terminal, navigate to the you-choose folder, run "npm-start", and the app will open in a browser window


## Usage
### The Basics
- Type in a list of things you need help choosing from in the text box on the left, with each thing on a new line.
  - Edit and delete items as you wish
  - Do not click the "Save List" button!
- Click on the "Choose for me!" button in the middle, and your fate will be written in the text box above the button
  - (This is your fate now.  Do not dare run from it)
### Advanced
- Create an account in order to access the rest of the functions
  - Click on the "Create Account" button in the upper right, then enter in a unique username, then click the "Create Account" button in the center to confirm
  - To log out, click log out in the upper right
- To save your list of choices for later:
  - Click the "New List" button, enter a name for your list, then click the "Confirm" button
  - Click on your newly made (empty) list in the select box on the right.
  - Enter in the list of items you want to save to this list, then click the "Save List" button
  - The list is now saved, and you may safely log out and your list will be saved
- To log in, click the "Log In" button, enter your username, then click the "Log In" button in the center of the screen
- To delete a list that you have previously saved, click on the list you want to delete, then click the "Delete" button

## Contributing
To add to this code, edit index.js and index.css as necessary.

## Credits
Joshua Vahlberg

## License

MIT License

Copyright (c) 2022 Joshua Vahlberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
