var titles = ['Sweet Teriyaki Beef Skewers', 'Buffalo Chicken Stuff Shells', 'Easy Homemade Pad Thai', 'Chocolate Peanut Butter Bacon Cookies'];
var images = ['https://images.media-allrecipes.com/userphotos/720x405/1002967.jpg', 'https://images.media-allrecipes.com/userphotos/720x405/1132257.jpg', 'https://images.media-allrecipes.com/userphotos/720x405/3926830.jpg', 'https://images.media-allrecipes.com/userphotos/720x405/5272966.jpg'];
var numOfIngredients = [8, 7, 11, 12];
var ingredients = ['1 1/2 cups light brown sugar', '1 cup soy sauce', '1/2 cup pineapple juice (optional)', '1/2 cup water', '1/4 cup vegetable oil', '3 large garlic cloves, chopped', '4 pounds boneless round steak, cut into 1/4-inch slices', 'bamboo skewers, soaked in water',
'1 pound ground chicken', '1/4 cup butter', '1 cup cayenne pepper sauce', '16 ounce container whipped ricotta cheese', 'cooking spray', '16 ounce package jumbo pasta shells', '8 ounce package shredded Cheddar-Monterey Jack cheese blend', 
'4 ounces pad Thai rice noodles', '2 teaspoons vegetable oil', '1 egg', '1/2 cup water', '2 tablespoons crunchy peanut butter', '2 tablespoons soy sauce', '2 tablespoons lime juice', '2 teaspoons packed brown sugar', '1/2 teaspoon ground ginger', '1/4 teaspoon McCormick(R) Red Pepper, Crushed', '1 cup bean sprouts',
'1 pound bacon', '2 cups all-purpose flour', '3/4 cup unsweetened cocoa powder', '1/2 teaspoon baking soda', '1/2 cup butter, softened', '1 cup brown sugar', '1/4 cup white sugar', '2 large eggs', '1 teaspoon vanilla extract', '13 ounce package miniature peanut butter cups, chopped', '1/4 cup peanut butter'];
var numOfInstructions = [6, 7, 3, 6];
var instructions = ['Whisk brown sugar, soy sauce, pineapple juice, water, vegetable oil, and garlic together in a large bowl; drop beef slices into the mixture and stir to coat. Cover bowl with plastic wrap.', 'Marinate beef in refrigerator for 24 hours.', 
'Remove beef from the marinade, shaking to remove any excess liquid. Discard marinade.', 'Thread beef slices in a zig-zag onto the skewers.', 'Preheat grill for medium heat and lightly oil the grate.', 'Cook skewers on preheated grill until the beef is cooked through, about 3 minutes per side.',
'Heat a large skillet over medium-high heat. Cook and stir ground chicken in the hot skillet until browned and crumbly, 5 to 7 minutes; drain and discard grease.', 'Melt butter in the skillet with the cooked chicken. Stir cayenne pepper sauce into the chicken mixture and remove from heat.', 'Squeeze as much moisture from the ricotta cheese using a cheese cloth or paper towels; put drained cheese in a large bowl. Add chicken mixture to the cheese and stir. Refrigerate until completely chilled, 3 to 4 hours.', 
'Preheat oven to 375 degrees F (190 degrees C). Prepare a 13x9-inch baking dish with cooking spray.', 'Bring a large pot of lightly salted water to a boil. Cook pasta shells in the boiling water until cooked through but firm to the bite, about 10 minutes; drain. Rinse with cold water until no longer hot; drain.', 'Spoon chicken mixture into cooked pasta shells and arrange into the prepared baking dish. Sprinkle Cheddar-Monterey Jack cheese blend over the stuffed shells; season with salt and pepper.', 'Bake in preheated oven until the cheese is slightly melted and the stuffing is hot in the middle, 15 to 20 minutes.',
'Preheat oven to 350 degrees F (175 degrees C).', 'Place the bacon in a large skillet and cook over medium-high heat, turning occasionally, until evenly browned, about 10 minutes. Drain the bacon slices on paper towels.', 'Mix flour, cocoa powder, and baking soda together in a bowl.', 'Beat butter, brown sugar, and white sugar together with an electric mixer in a large bowl until smooth. Beat 1 egg into butter mixture. Beat second egg into mixture along with the vanilla extract; add flour mixture and mix well into a cookie dough. Crumble bacon and add to the dough with the chopped peanut butter cups; fold bacon and peanut butter cup chunks through the dough. Drop peanut butter in small amounts into the dough and swirl into the dough, but not mixing completely to integrate.', 'Drop spoonfuls of dough onto baking sheets.', 'Bake in the preheated oven until the edges are golden, about 12 minutes.'];

var count = 0;

function writeTitle() {
    document.getElementById("title").innerHTML = titles[count];
}

function displayImage() {
    document.getElementById("foodpic").src = images[count];
}

function writeIngredients() {
    var y = document.createElement("LI");
    for(var i = 0; i < numOfIngredients[count]; i++) {
        var t = document.createTextNode(ingredients[i]);
        y.appendChild(t);
        document.getElementById("ingredients").appendChild(y);
    } 
}

function writeInstructions() {
    var y = document.createElement("LI");
    for(var i = 0; i < numOfInstructions[count]; i++) {
        var t = document.createTextNode(instructions[i]);
        y.appendChild(t);
        document.getElementById("instructions").appendChild(y);
    } 
}

function increaseCount() {
    count++;
}