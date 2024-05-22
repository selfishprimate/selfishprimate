---
title: Optimizing UX for VavaCars Vehicle Inspection App
description: As my first task at VavaCars, I was assigned to fix the UX issues in the VavaCars Vehicle Inspection app, a web app used on tablet devices by vehicle inspectors during car inspections. 
quote: '"Good design, when it’s done well, becomes invisible. It’s only when it’s done poorly that we notice it." - Jared Spool'
label: "VavaCars"
thumbnail_image: "cover-small.jpg"
thumbnail_image_alt: "VavaCars Vehicle Inpection App UX Optimization"
tags: ["UI/UX Design", "Inpection App UX Design", "Web Design", "Best UX Practices"]
weight: 3
---

{{< figure 
    src="images/cover-large.jpg"
    caption="To understand the pain points and usability issues, I began by meeting with the vehicle inspectors. I listened to their pain points and gathered their ideas for improvement." >}}

### Overview

As my first task at VavaCars, I was assigned to fix the UX issues in the VavaCars Vehicle Inspection app, a web app used on tablet devices by vehicle inspectors during car inspections. My objective was to identify and resolve the pain points that inspectors faced while using the app. 

 By enhancing the user experience, I aimed to streamline the inspection process, making it more efficient and user-friendly. This project was a significant step in improving the overall workflow and satisfaction of the vehicle inspectors.

### Objectives
- Identify and resolve usability issues in the VavaCars Vehicle Inspection app.
- Streamline the inspection process to make it more efficient.
- Create a user-friendly interface that meets the needs of the vehicle inspectors.

### Research
To understand the pain points and usability issues, I began by meeting with the vehicle inspectors. I listened to their pain points and gathered their ideas for improvement. Additionally, I asked about their experiences with similar applications in previous jobs to understand what worked well and what did not. By comparing our application with competitors, I gathered valuable insights. I also observed the inspectors while they used the app to identify issues firsthand.

Here are some of my research findings and possible solutions.

**Inspectors reported difficulties in locating specific checkpoints within the system, indicating a need for an improved search functionality:** Implemented a global search feature accessible from the main menu to help inspectors quickly find checkpoints.

**Inspectors struggled with clicking small areas on the car diagram, such as tires, rims, mirrors, and headlights, leading to inefficiency and frustration:** Updated the car diagram to enlarge problematic areas and introduced text links. Also, tested the springboard design pattern for the “Condition” section.

**Experts noted that some frequently used options were not easily accessible, slowing down the inspection process:** Integrated a feature for frequently used options to streamline workflows and speed up the inspection process.

**Some options were rarely used, causing clutter, while other necessary options were missing, increasing the inspectors' task load:** Revised the information architecture to remove rarely used options and add necessary ones, reducing clutter and task load.

**Taking photos for every car part, especially undamaged ones, was time-consuming and often unnecessary:** Identified checkpoints that do not require photos and updated the system to prompt photo capture only for damaged parts.

**The native photo component used during inspections was slow, leading to complaints from all experts:** Worked with the technical team to streamline the photo capture process, removing unnecessary screens to speed up the workflow.

**Inspectors did not understand the “inch” unit used for describing scratches and dents, causing confusion:** Replaced the “inch” unit with “cm” to align with inspectors' familiarity and improve clarity.

**Experts found it challenging to locate options quickly when they were not listed alphabetically:** Listed all options alphabetically to help inspectors find them more easily and quickly.


### Ideation and Prototyping
Based on the findings from my research, I created mid-fidelity prototypes. These prototypes were then tested with the inspectors to gather feedback. I iteratively updated the designs based on the test results until we arrived at the best design solutions that worked for them.

### Challenges
One significant challenge was putting myself in the inspectors' shoes. I had never designed anything like this before and did not know my persona well. To overcome this, I spent a lot of time with the inspectors, observing them and chatting with them like a friend, not just about the inspector application but also about other aspects of life.

Another challenge was dealing with the old and cluttered user interface of the application. There were no reusable design components or design tokens, and the Figma project file was a complete mess. This required a lot of work to create the necessary design components to compose the screens I needed.

### Design Approach
My design approach was the Continuous Discovery method. I focused on designing the smallest possible elements and breaking things down into shippable chunks (updating checkpoints and UI elements, and adding small features, etc.). This allowed us to deliver value early and often, and get feedback on our ideas before investing significant resources.

### Final Design
So, here are some of the final designs that I've come up with based on my extensive research and testing sessions.

{{< figure 
    src="images/vavacars-vehicle-inspection-app-native-radio-buttons.jpg"
    alt="Best UX practices for selectable elements, Material Design radio buttons."
    caption="To enhance usability and performance, I integrated Material Design radio button components, mitigating fat finger issues during interaction." >}}

{{< figure 
    src="images/vavacars-vehicle-inspection-app-native-checkbox-components.jpg"
    alt="Best UX practices for selectable elements, Material Design checkboxes."
    caption="Utilizing Material Design checkboxes not only streamlines interaction but also minimizes the risk of fat finger errors, ensuring a smoother user experience overall." >}}

To address the limitation of selecting only one color per car in the previous app, I introduced a checkbox feature that enables inspectors to indicate if a car has two colors. Upon selection, inspectors can then utilize dropdown menus to specify the respective colors, ensuring accurate representation of vehicles with dual color schemes.

{{< figure 
    src="images/vavacars-vehicle-inspection-app-dropdown-menu.jpg"
    alt="Material Design dropdown menus for color selection."
    caption="Two color options allows inspectors to accurately identify cars for customers." >}}

{{< figure 
    src="images/vavacars-vehicle-inspection-app-color-selection.jpg"
    caption="For the vehicle color selection screen, to avoid any usability issues, I've included both clear color labels and color boxes to support inspectors with visual impairments such as color blindness." >}}

{{< figure 
    src="images/vavacars-vehicle-inspection-app-accordion-menus.jpg"
    caption="I've organized options under relevant accordion menus to streamline the design and ease the task of inspectors in locating specific car parts within the app, reducing cognitive load." >}}

{{< figure 
    src="images/vavacars-vehicle-inspection-app-global-search-feature.jpg"
    caption="The globally available search feature enables inspectors to locate vehicle parts effortlessly, regardless of their location within the application." >}}

{{< figure 
    src="images/vavacars-vehicle-inspection-app-photo-capturing.jpg"
    caption="I've implemented the photo capturing feature exclusively for vehicle parts that necessitate photographic documentation." >}}

### Conclusion
By updating the current application, I aimed to improve its usability and functionality while maximizing efficiency. Leveraging native design components such as checkboxes, radio buttons, and inputs, I streamlined user interactions and mitigated potential issues like fat finger problems. Additionally, these updates contributed to a reduction in inspection time, with improvements leading to approximately 5 to 10 minutes saved per inspection.

Thank you for reading.
