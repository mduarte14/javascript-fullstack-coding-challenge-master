# Wonderschool Coding Challenge

## Introduction

Thanks for your interest in joining the Wonderschool engineering team! Before we proceed with more
formal interviews, we ask that all candidates take our coding challenge. The coding challenge is
a foundational piece of our process and it's referenced later in our process during the technical
interviews. Instructions for the coding challenge and submission process are outlined below.

For an experienced full-stack web developer, the coding challenge should not take longer than
**2-3 hours** to complete. We understand that everyone has different schedules and we are happy to
accommodate your availability. If you need more time, please let us know.

If at any point you have questions concerning the coding challenge and/or interview process, please
do not hesitate to email engineering@wonderschool.com.

## Coding Challenge

The coding challenge revolves around building a task list. Tasks belong to groups and can have
dependencies on one another (i.e. if task X depends on task Y, task X cannot be completed until
task Y is completed). The challenge includes 3 components:

- Build React-based UI
- Complete a backend interface
- Design database schema

### Build React-based UI

The UI consists of 2 screens:

- **Overview**: Displays a list of all the groups along with their completion status. Clicking on
  a group should render the detail screen.

- **Detail**: Displays a list of all the tasks in the selected group and allows the user to toggle
  the completion status of unlocked tasks.

The screens should look like this:

![screen design](https://user-images.githubusercontent.com/314351/56453206-d1ec2580-62f3-11e9-83d7-67aff2e1deef.png)

The data you should use to implement your solution is available at a `GQL Query` called `tasks`, you can find it on _./client/src/graphql/getTasks.graphql_.
SVG assets for the icons used in the design live in _./client/public/_.

Requirements:

- Locked tasks cannot have their completion status toggled
- Tasks remain locked until all of their dependencies have been completed
- When clicking the box to complete a task, you must use the `toggleTask` mutation.
- Your implementation should resemble the above design
- **Please do not introduce any new dependencies**, you should have everything you need to complete
  the challenge
- We value well structured code that follows industry best practices

### Complete a backend interface

As mentioned above, you will need to use the `toggleTask` mutation to complete/un-complete a task. To accomplish
this, you will need to implement the backend logic for toggling the task.

### Design Database Schema

Design a database schema to store the task list data by writing the SQL code needed to create
the schema in `schema.sql`. The schema should define all tables, columns, and constraints needed
to store the task list data.

## Getting Started

- To get started, clone this repo to your local machine.
- Next you'll want to install the dependencies and run the client and server (we recommend using `node 20 LTE`):

  ```bash
  cd server
  yarn install
  yarn dev
  ```

  open other terminal on the root of this project

  ```bash
  cd client
  yarn install
  yarn start
  ```

At this point, the client and server should be running in development mode and any local modifications you make
will be automatically detected and result in reloads.

You should only need to add/modify code in the _./client/src/_ and _./server/src/_ directory.

## Submission

To submit your coding challenge, commit all your changes to the `master` branch and run the
following commands:

```
# Make sure all changes were committed
git diff-index --quiet HEAD -- || echo 'You have uncommitted changes!'

# Create bundle to submit
git bundle create coding-challenge.bundle HEAD master
```

Email the generated _coding-challenge.bundle_ file to engineering@wonderschool.com. We do our
best to review and respond to submissions within 5 business days.

Thanks for taking the time to do this coding challenge and here's to hoping we talk soon!

# Candidate: Miguel Notes

    - NOTES: We're explicitly told in the prompt that we should not introduce
      new dependancies. I have implemented a postGresSql DB locally; however,
      due to not being able to install 'pg' or 'knex' I will treat the provided
      mock data as if it was the sql server data.
      I will provide two versions of this code:
        - One manipulating the mock data
        - One commented out code on how to handle if we had access to SQL libraries
          that would allow me to connect to a SQL DB like PostGres

    - Additional NOTES:
      - Under normal working conditions I would not leave commented out code
        say for a PR.
      - I am only doing this to showcase the SQL calls needed
