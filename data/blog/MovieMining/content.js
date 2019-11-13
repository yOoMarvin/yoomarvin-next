const text = `
In the last month of my first semester as a Master student, the first big project was incoming. And it was in one of the most interesting courses, too. Data Mining. The goal of this student team project was to get more comfortable with basic data mining tasks, algorithms and classification approaches. All of that with real-world data. So, let's grab the reading glasses and dive into the first big post of 2018! 
_Side note here: I'm trying to keep things simple, but due to my nerdism, sometimes things can get a bit complicated and weird. So some basic programming or data science knowledge will definitely make reading this post easier._

## Kicking Things Off
The cool thing about this project was that we as students had pretty much freedom in terms of choosing a topic. This was the first task in the first few days. In our team of 5, we decided pretty quickly that we wanted to do something with movies. But what exactly? Possibilities are endless. Well, let's keep things short and just say that we wanted to develop a classification model to predict the financial success of future movies. This is actually a pretty interesting topic. Diving into the world of movies and see what factors influence a movie. What about production country, cast, camera lenses, time of release etc? Do more expensive movies generate more revenue? Is there a magic formula for a successful movie? Those were some things we wanted to know. What do you need for that? Data. And there is a ton of movie data out there. 

The go-to source for us was [Kaggle](http://kaggel.com/). The biggest and most popular dataset we found here was [The Movies Dataset](https://www.kaggle.com/rounakbanik/the-movies-datase). It contains metadata of around 45.000 movies from the last 60 years, all in the _csv_ format. Here you can find basic financial data like budget and revenue, other metadata like the genre, release dates, summaries and also more complex data e.g information about the cast and the crew. So, let's take a look at our virtual checklist: project topic? Check. Data selection? Check. What's next? Setting up the project and dive into the data!

## Doing Baby Steps
We did everything of this project with Python and basic data science libraries like [scikit-learn](http://scikit-learn.org/). By the way. You can find all of the code on [GitHub](https://github.com/yOoMarvin/movie-mining). There is also a more detailed report available if you want to read more about our results. 
Our basic project structure consists out of 4 folders. **Data** for all datasets in raw and processed format. **Notebooks** as a playground, which wasn't actually used very much. **Snippets** for quick access things that are used more often. And the heart, **src**. Here we kept all our Python scripts for preprocessing, classification, evaluation and exploring. Be careful, you can get lost easily here. As we started the project we needed to explore the data first in order to understand basic relations and just get to know the structure. And there it was. The first big problem.
After some test, we found out that the dataset has a ton of 0 or invalid numbers in financial attributes like revenue or budget. And in addition to that, there are an awful lot of values that are scaled wrongly. So after killing all those we had only around 5000 data points. Still enough for the purpose of this project, but that was pretty heavy hit. We then tried to fill the wrong entries with more reliable values from IMDB. But making 40.000 API requests in Python isn't the easiest task. 

The remaining data points were preprocessed and encoded in a few different steps. All of this was done with specific functions for each preprocessing steps. To make sure that everything works well together, in the end, we wrote a script that simply calls all the functions and exports the final dataset for classification. 
![Data Features](/static/img/moviemining-features.png#blogimage)
_Preprocessing on the data attributes_

But wait. I didn't mention what we actually wanted to classify and predict. Well, the most obvious approach would be the revenue. But this would be a nasty regression problem and too complex for our beginner data science brains. Also, we hadn't enough data for that. In addition to that, you also have to keep in mind that costs and revenue for movies changed over the years due to factors like inflation and globalization. Consumer behavior changed, too. So we needed an independent value here and decided to introduce a new attribute to the dataset. A productivity rate. This one should indicate the relation between revenue to budget. A productivity rate > 1 would mean that the movie is a financial success and generates more revenue than it has as a budget. To make the classification even simpler we kept things super basic and decided to just make a binary classification if a movie is productive or not. No, everything was ready for classification.

## Making it Smart
To get good results we tried a bunch of different classification algorithms. _KNN, Decision Trees, Neural nets, Bayesian Classifiers_ etc. All of those of course tuned with the best parameters possible. Because we are rather lazy programmers we wrote a basic classification template that does all the work for us. So we just needed to say this script which of the classifiers we wanted to use et voilá we get some output. This was a very handy thing as it turned out in a later stage of the project, where we could quickly change things up in a centralized way. So now way to tweak hundreds of lines of code here! Investing some more time for a good fundament is always a good idea!

![Data Results](/static/img/moviemining-results.png#blogimage)
_Classification results_

For evaluation, we used _F1 macro_ scores to get a good and balanced indicator whether the results are fine. And well, our results are okayish. Of course, we don't have a spectacular performing classification model, but for this specific problem with that little data, it performs pretty well! The best two algorithms we used were the _KNN_ and _Support Vector Machines_. But all of the models were better than naive guessing. 

![ROC Curve](/static/img/moviemining-roc.png#blogimage)
_Roc Curves of all used classification algorithms_

## What's next?
Because of the very short timespan of the project we needed to keep things short and very simple. Of course, we could improve a lot of aspects. Just for example the data quality and size of the data. We also had problems with balancing and could also extract more useful information in better ways. Like for the cast, crew and the little text summaries. But all in all, we are very satisfied with our results. For the first own project in the data science and data mining world, we made a good job! It was fun to work with this group and we will certainly do more projects in the future together. I really enjoyed diving into this new world and solving a bunch of interesting problems! I've learned a lot here and will definitely extract some of those lections to use them for my other work. 

If you want to have more information on this project or want to read more, make sure to check out the [GitHub repository](https://github.com/yOoMarvin/movie-mining) or simply write a DM on Twitter! Thank you for reading this!
`;

export default text;
