import express from "express";
import bodyParser from "body-parser";
// import nodemailer from "nodemailer";

const app = express();
const port = 3000;
let blogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/new", (req, res) => {
  res.render("creat.ejs"); // renders the postcreation page
});  


app.get("/contact",(req,res)=>{
  res.render("contact.ejs");
});

app.get("/about",(req,res)=>{
  res.render("about.ejs");
});

//to edit the post
app.get("/edit/:id",(req,res)=>{
  const { id } = req.params;
  const blog = blogs.find(blog=> blog.id == id);

  if(!blog){
    return res.status(404).send("Blog post not found!");
  }
  res.render("edit.ejs",{ blog });


});

app.get("/view-posts", (req, res) => {
  res.render("view-post.ejs",{ blogs }); // to view the posts
});

//deals with post creation 
app.post("/submit",(req,res)=>{

  const { title, content } = req.body;

  if (!title || !content) {
      console.error("Title or Content is missing or invalid!");
  } else {
      const date = new Date();
      blogs.push({ 
        id: Date.now(),
        title,
        content,
        date: date.toLocaleString() }); // Push the first data into blogs array
      console.log("Blogs array after adding:", blogs); // Check the blogs array
  }
  
  res.render("view-post.ejs",{ blogs });
});

app.post("/edit/:id", (req,res)=>{
  const { id } = req.params;
  const { title, content } = req.body;

  const blogIndex = blogs.findIndex(blog=> blog.id == id);
  
  if(blogIndex === -1){
    return res.status(404).send("Blog post not found!");
  }
  blogs[blogIndex]={
    ...blogs[blogIndex], 
    title,
    content
  };
  console.log("Blogs array after updte:",JSON.stringify(blogs, null, 2));
  res.redirect("/view-posts");

});



//deals with post deletion
app.get("/delete/:id",(req,res)=>{
  const { id } = req.params;
  const dltBlog = blogs.find(blog=> blog.id == id);
  if (!dltBlog) {
    return res.status(404).send("Post not found"); // Handle invalid ID
  }
  res.render("deletion.ejs", { dltBlog });
});

app.post("/delete/:id",(req,res)=>{
  const { id } = req.params;
  const blogIndex = blogs.findIndex(blog => blog.id == id);
  if(blogIndex === -1){
    return res.status(404).send("post not found");
  }
  blogs.splice(blogIndex, 1);
  console.log("blogs array after deletion:", blogs);

  res.redirect("/view-posts");
});

app.post("/contact", (req,res)=>{
  const { name, email, message } = req.body;

  console.log("Message: \n",message,"\nFrom:\n",name," (",email,")");
  // const transporter = nodemailer.createTransport({
  //   service:"Gmail",
  //   auth: {
  //     user:"yourMailID",
  //     pass: "yourPassword"
  //   }
  // });

  // const mailOptions = {
  //   from: email,
  //   to: "your mail",
  //   subject: 'Contact From Submission from ${name}',
  //   text: 'Message: \n${message}\n\nFrom:\n${name} (${email})'
  // };

  // transporter.sendMail(mailOptions, (error, info)=>{
  //   if(error) {
  //     console.error("Error sending mail:", error);
  //     res.send("<h1> OOPS! somthing went wrong. Please try again later.</h1>");

  //   } else {
  //     console.log("Email sent:", info.response);
  //     res.send('<h1>Thank you, ${name}! your message has been sent.</h1>');
  //   }
  // });
  res.send('<h1>Thank you, your message has been sent.</h1>');

});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
