# Maybe Full Stack Code Challenge

Details: https://company.maybe.co/b32696ab48f44761aa138dcfead7f099

This is a simple app to lookup airport information.

## Getting Started

The app is designed to work out of the box with no external dependencies, other than node modules.

```shell
yarn install
```


## Running locally

```shell
yarn dev
```

Once started, the app should be available via http://localhost:3000



## Help

For detailed explanation on how things work, check out [Next.js docs](https://nextjs.org).

# Interview

## Debounce issue
There's a working version of the code with the debounced call to the apis in the branch [`debounce-working`](https://github.com/dgrcode/maybe-finance-interview/tree/debounce-working).

The problem seems to be related with using an async debounced function as the event handler. I'm still unsure about what was causing the issue, but the final version of the code with the api call made inside `useEffect` was very easily updated to use debounce.

## Responses
1. What are some edge-cases you'd consider before shipping this feature?
 Thinking about edge-cases I'm initially looking at "empty" or "huge" situations.

 Starting with data, airports with empty data wouldn't show up in any search, but I think that's expected.

 The other case, huge data, shouldn't be a concern, as the data will come from some database that should have some kind of size limits in text fields. We shouldn't see strings that large that would cause a problem finding substrings in them.

 In terms of UI, I don't see many edge cases, since having too many or too little results shouldn't be problematic thanks to having pagination. There are definitely UI improvements that should be made, but nothing that I can see in terms of edge cases. Maybe a UI edge case could be responsiveness (different screen sizes) and very long airport names. That should be easy to handle.

 In terms of performance, a big amount of users searching at the same time could be a performance issue when hitting the database at the same time. Debouncing requests (implemented in branch [`debounce-working`](https://github.com/dgrcode/maybe-finance-interview/tree/debounce-working)) and cancelling stale ones should be a good solution for this edge case.

2. How do you design a large project like Maybe for scalability/maintainability/reliability?
 In terms of scalability, any synchronous backend code should be fine in Next.js given that lambdas are created and they are great for scalability. For asynchronous code, like getting information from many databases, queuing processes, etc, having separate microservices handling different concerns could be a good solution.

 For maintainability, the fact that the whole stack uses TypeScript is an advantage, and it makes it easier to maintain. I might be cautious about external packages that might need maintenance in the future. Handling tech debt in time is also important as the complexity grows. With this I mean not letting debt grow to a point where just a few people are able to touch certain parts of the code because everyone else is afraid os breaking something when changing those parts. Keeping the code readable and well documented is a must in my opinion.

 In terms of reliability, I think tests and continuous integration are key. TDD, even though I like it very much, is probably not the best way to go when a project is in early stage, because the slower speed of development is probably not worth it. I'd say having a good end to end and integration coverage of new features in a CI should be good enough.

3. What's been your experience with SQL and scaling up performance with very large data sets?
 My experience with SQL is limited, since I've used document based (mongodb and firebase) on my personal projects.

 I have some experience with SQL from when I worked at Toast (restaurant software company) and we had to deal just with scaling and performance of the database, but it was a different team who was working on it.

 From the takeaways they shared I learned a couple of things, but as I say, my personal practical experience with SQL is very limited.
  - First, monitor db performance. The way indices are set up might be optimal for some use cases, but other might hurt the db performance. Keeping track of slow queries might surface issues with indicies that can be handled before the performance is heavily impacted.
  - Second, sharding. As the db data and load grows, we had to start creating shard instances of the db. That improved the load of the databases and the performance stayed within Toast's expectations

4. What's important for remote engineering teams to work well?
 I think the main point to have an remote engineering team working well is access to information. Here information is everything: conversations, how-to's for different problems, setup guides, documentation, etc.

 I've worked in two different type of setups: fully remote, and mixed.

 I'd say mixed setups are very difficult to get working. This is especially true when most of the team is on site and just a few people remote. People on site will often forget about the remote folks, and things will be discussed in person, not written down, and therefore not accessible to remote people. Most documentation is not written but just asked when needed to the person that knows about that particular thing.

 In fully remote teams, everybody is on the same page about sharing and persisting information. What I found is that information is actually more widely available. Even random one-to-one conversation will probably happen in some chat channel and everybody has access to read and participate on them. Those conversations are easily searchable, making it easier to find information when needed, even if you never participated in the original conversation.

 On more thing regarding sharing information. When someone is blocked due to missing information, that's a sign that the information needed should be accessible somewhere publicly (I mean within the company). The same happens if a couple of different people have to ask the same question. That's probably asking for a small document. These documents don't need to be finished and complete. I believe a living document that gets updated with new information is completely valid.

 Other than access to information, I think it's important to assume good intentions. Since you don't really know the people you're interacting with, and text is missing many social indicators (like tone, volume, etc.), anything you read has to be interpreted. Making sure those interpretations assume good intentions on the other part is quite important. A simple misunderstanding could make someone feel attacked when the intentions where completely different.
