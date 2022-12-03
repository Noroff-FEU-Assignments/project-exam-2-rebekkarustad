# How to set up

1. Clone repo from GitHub
2. Open Terminal
3. Run 'cd project-exam-2' in Terminal
4. Run 'npm install' in Terminal
5. Run 'npm start' in Terminal

# How to access / log in

The first page you will enter is the registration page. If you don't have a user, you can make one here. The email address has to end with either '@noroff.no' or '@stud.noroff.no'
If you already have an account, you can click on the bottom link to access the login page.

---

# Rapport

## Introduction

In our last project exam, the assignment was to create a front end for an existing Social Media company. Some essential features had to be included, but design and user experience were not specified. Noroff gave us an API that we would work with to build a modern front-end social media application.

The idea behind my design is a simple social media site where people can share what they are up to, comment, and react to their everyday lives. As you the text length is limited, and you can only post one image per post; it is a simple app that you don't need to overthink what you are posting, in comparison to other social media.

## Planning process

The client required us to hand in a kanban project board and a Gantt chart, so naturally, I started by making a Trello board and a matching Gantt chart. I was optimistic in the planning, as some of the components were harder to figure out than anticipated, but I got there in the end. More about the difficulties further down in the rapport.

## Design

### Colors

I chose some simple colors so that the content on the social media site would stand out more. I wanted some simple colors that fit nicely together. I did some research on Pinterest for different color pallets and ended up with these beige, simple colors with a darker header color so that I would stand out.

### Typography

For the fonts I chose, I wanted two fonts that work well together, fit nicely together and also do well on the site. I chose a serif font called 'Playfair Display' for the header fonts. With the sans-serif for the rest of the text, I decided on 'Chivo', as it fits nicely with 'Playfair Display' and is also easy to read when there is more text.

### Changes from prototype

If you look at the prototype, there are some changes from the final design. I chose to keep the original prototype to show how I planned it to be and how it ended up. There are some bigger changes I wanted to address:

1. On the profile-discover page, you can see that it was originally intended to be more image-focused, and you can see what images the different users have posted. I had not looked at the API closely enough when designing this and did not know that the image part was optional, making it look rather weird on the page. Therefore I changed it so that you can only see the user's banner and profile-image.

2. On the change profile page, something similar happened, as I didn't notice that you can't change your username, email, and password after you have set it. Therefore it ended up much more straightforward with only two inputs.

3. Colors. I changed the background color several times before I ended up where I did. The simple reason for this is that it felt too light. After user-testing the page early on, it was pointed out that the contrast between the backgrounds and the containers could have been better, even with the shadows.

4. Navigation bar. As you see on the prototype, there was just a plan of using icons, but as I designed and the website came together, I didn't like how they looked and went for words instead. I think it looks better and classier.

## Technical

### Difficulties

As mentioned, some of the components were easier than others. Here are the components I had the most challenging time with:

- Infinite Scroll. Initially, I needed to figure out how I wanted to handle the information. At first, I thought I would use pagination, but after some research on other platforms, all of them had an infinite scroll, something I hadn't even thought of. It took me some time to figure it out with some help from a YouTube video [1]

- Follow / unfollow. I spent a lot of time figuring out how to do this the best way and ended up with a good solution, even though the site have to be refreshed. There is probably a better way to do it, but it works now.

- Comments. The comment section was a big thing. A lot of back and forth on how I wanted to do it, and I had to rewatch the tutorial at least three times[2], but I got there in the end and am very happy bout the result.

- Tags. Getting the tags into an array correctly took way more time than it should have. I tried many different solutions but ended up with a simple way from React Hook Forms documentation.

- Props. I had a hard time understanding props and hooks, and I have a lot more to learn. As you can see, I have used props a lot during my project and could possibly do more, but we are happy that I finally understood how it works (at least the basics.)

# Summary

## Went well

- Design. I am pretty happy with my design. I was done with the prototype early on and haven't deviated too much from it. Happy with most colors (except the one mentioned previously), and the typography looks neat.

- Solutions. I am pretty happy with many of the solutions I have come up with and am quite satisfied that I could get the site working with all the components I wanted to add.

- Using API. I feel like I understood the API well and did not have a lot of issues with it.

## Not so well

- Keeping to plan. As always, keeping to the plan is not easy, especially with life going on. Some things took longer than expected, but I got there in the end.

- Hooks. I know that I have reused some of the code a lot and could probably make more of them into hooks, but I had a lot of issues with understanding it correctly, which is something I really have to work on in the future, as it is beneficial.

## Next time

Even though this is the last project here on Noroff, I still learn something every time I code, and here is something to take with me to my next project and, hopefully, work-life.

- Looking at and reading the documentation correctly before designing. As mentioned above, I could have looked more thoroughly through the API documentation and therefore had to change my design slightly.

- Stay focused on details for a short time. Some of the things took me days to figure out, and I should have gotten back to it later so that the rest of the components could be ready before getting stuck on details.

## Final thoughts

I am very happy with my final product. There are some things here and there I could do better, as there are always things to learn.

Lastly, I personally wish the API restrictions were a little more strict, as my app would look much better if pictures were mandatory (which I also overlooked until coding).

---

# References

## Videos

Videos that helped me out
1 - "React Infinite Scroll like YouTube, Instagram | with Animation", YouTube, uploaded by Code Bless You, August 8th 2022, https://www.youtube.com/watch?v=ahpbfQybX94
2 - "React Building Comments Application", YouTube, uploaded by Monsterlessons Academy, September 7th, 2021, https://www.youtube.com/watch?v=sjAeLwuezxo&t=2821s
3 - "Code Review -Add Emoji Picker to a ReactJs Chat App", YouTube, uploaded by Terry Ebieto, December 19th 2020, https://www.youtube.com/watch?v=vsIDc9FTxzM&t=143s

## Photos

All images used are from unsplash.com - all photos used can be found in this album: https://unsplash.com/collections/iqK2P7DgpEg/project-exam
