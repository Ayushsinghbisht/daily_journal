//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "A student at the National Institute of Technology (NIT) is an individual fueled by ambition, curiosity, and a thirst for knowledge. NIT students, handpicked through rigorous entrance examinations, demonstrate exceptional academic prowess and technical acumen. They embrace diversity and collaboration, hailing from various backgrounds and cultures. With access to cutting-edge research facilities and expert faculty, NIT students strive to excel in their chosen fields, whether it be engineering, technology, or the sciences. Besides academic brilliance, they also actively engage in extracurricular activities, fostering a well-rounded personality. NIT students are the torchbearers of innovation and progress, poised to contribute significantly to society and leave a lasting impact on the world.";
const aboutContent = "The National Institute of Technology (NIT) is a group of premier engineering and technology institutes in India. Established by the Government of India, NITs are autonomous public technical universities that offer undergraduate, postgraduate, and doctoral programs in various engineering, technology, and science disciplines.NITs are renowned for their academic excellence, research output, and state-of-the-art infrastructure. They follow a rigorous admission process based on competitive entrance examinations, such as the Joint Entrance Examination (JEE) for undergraduate programs and the Graduate Aptitude Test in Engineering (GATE) for postgraduate and doctoral programs.";
const contactContent = "Visit the Official Website: Go to the official website of the specific NIT you want to contact. The website address typically follows the format www.nitname.ac.in (replace name with the actual name of the NIT).Look for Contact Us or Contact Page: Most NIT websites have a dedicated Contact Us or Contact page. This page will contain the contact information for various departments and officials.Find the Relevant Contact Information: On the Contact Us page, you'll likely find a list of departments or administrative offices. Identify the department or official you want to contact, such as the Dean, Registrar, or specific academic departments.Use the Provided Email Address or Phone Number: Once you find the contact information of the official or department you wish to reach, use the provided email address or phone number to get in touch with them.Compose Your Message: When writing your email or making a phone call, clearly state the purpose of your communication and be concise and respectful in your message.Wait for a Response: Depending on the volume of inquiries, it may take some time to receive a response. Be patient and wait for the NIT officials to reply to your query.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
