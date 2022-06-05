Feature: Finished Tasks

    As a user I want to know which tasks are already finished
    so I will complete and focus on only unfinished tasks.

    Scenario: Mark tasks as finished
        Given I am in the todo Homepage and I want to create a new task
        When I Click the Add Button
        And Give a valid todo name
        And Click the done button
        Then A new task is added into the homepage
        Then I can mark the task as finished