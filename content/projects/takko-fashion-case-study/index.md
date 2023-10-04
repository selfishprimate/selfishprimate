---
title: "Takko Fashion Case Study: Evaluating and Redesigning the Filtering Section"
description: My goal was to make a design evaluation in order to find the fundamental usability flaws and redesign the filtering section based on these findings.
quote: '"The details are not the details. They make the design. - Charles Eames'
label: Takko Fashion
thumbnail_image: "cover-small-1600x1200.jpg"
thumbnail_image_alt: "A case study for redesigning a search filtering."
tags: ["Takko Fashion", "Filtering Design", "Filtering Redesign Case Study", "Instant Filtering Design", "Bulk Filtering Design", "Advanced Filtering"]
---

My goal was to make a design evaluation in order to find the fundamental usability flaws and redesign the filtering section based on these findings. By doing it, I was aiming to ensure that the filtering system will be easy to use, efficient, predictable and appealing for the users.

### Tools

I’ve read **NNGroup**'s articles to refresh my memory in this regard. I’ve checked some of the direct and indirect competitors’ sites like **H&M**, **Amazon**, **Etsy**, etc. in order to understand what they apply successfully and where they failed. I designed the screens by using **Figma** and collected my notes and findings in the **Notion** app.

### The results of my UX evaluation

{{< block class="image-at-left" image-src="images/inconsistent-spaces-around-the-filtering-button.png" image-alt="Inconsistent spaces around the filtering button.">}}

#### 1. Inconsistent spaces around the filtering button

The large and inconsistent spaces around the “Filter” button take up too many spaces on the vertical axis and this can prevent users from discovering more products. And the width of the button is out of the grid, thus the symmetry is broken.

#### Solution

So as a solution the spaces around the “Filter” button (highlighted with the red color) can be optimized and the button’s width value can be set to 100 percent in order to make it fill the horizontal space. Thus, we will be able to show more products to users, fix the broken symmetry, and increase the aesthetic appealing.
{{< /block >}}


{{< block class="image-at-left" image-src="images/design-for-focus.jpeg" image-alt="Inconsistent spaces around the filtering button.">}}

#### 2. Design for focus

When I click the “Filter” button, I see the design elements moving on the screen like they’re fighting with each other. Somehow, I don’t feel to filter the results by interacting with the screen. I think there are a couple of reasons that make me feel that way:

The first one is, the design pattern that has been used for filtering is not familiar to an average user. The most common pattern is to explicitly line up checkboxes in groups.

The second one is, the filtering section has the same level of importance as the rest of the page. So the importance and the visibility of the filtering section is diminishing. Therefore, it’s less visible and less attractive to the user.

**Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit of information in an interface competes with the relevant units of information and diminishes their relative visibility.**

#### Solution

So as a solution the filtering section can be redesigned in a more task-oriented way in order to increase the users’ focus (within a modal popup, bottom sheet or side drawer).

{{< /block >}}



{{< block class="image-at-left" image-src="images/fat-finger-problem.png" image-alt="Inconsistent spaces around the filtering button.">}}

#### 3. Fat finger problem with the price range slider

Due to the very small control dots of the price range slider, it is very hard to interact with the widget. This can cause frustration and make users abandon the site.

#### Solution

Control dots can be enlarged in order to help users interact with this widget easily.

Another solution can be offering **predefined price range values** for those for whom it is challenging to interact with the price range widget. Thus, users can click one of those predefined price range values in order to set the widget.

{{< /block >}}

