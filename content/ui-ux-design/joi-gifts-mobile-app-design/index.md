---
title: "Joi Gifts Mobile App Design"
description: "This project entailed defining requirements, establishing robust design tokenomics, and creating a comprehensive design system to guide development."
quote: '"A user interface is like a joke. If you have to explain it, it’s not that good." - Martin LeBlanc'
label: "Joi Gifts"
thumbnail_image: "cover-small.jpg"
thumbnail_image_alt: "Joi Gifts mobile app design."
tags: ["UI/UX Design", "Gifting App UX Design", "Gifting Platform UX Design", "Gifting App Design", "Joi Gifts Mobile App Design", "Joi Gifts Mobile UX Design"]
weight: 1
---

{{< figure 
    src="images/cover-large.jpg"
    alt="Joi Gifts mobile app design."
    caption="This project entailed defining requirements, establishing robust design tokenomics, and creating a comprehensive design system to guide development." >}}

### Overview

Embarked on a transformative journey with Joi Gifts to enhance user experience and performance by transitioning from old webview technology to a native mobile app. The goal was to address existing UX issues and leverage native app features to deliver a seamless and intuitive experience for users. This project entailed defining requirements, establishing robust design tokenomics, and creating a comprehensive design system to guide development.

### Objectives

* Fix performance and UX issues by migrating to a native mobile app platform.
* Enhance usability and offer a smooth user experience through native app features and components such as notifications, bottom sheets, and dialog boxes.
* Define needs and create a solid design tokenomics and design system to ensure consistency and efficiency in development.
* Generate design tokens in JSON format and share them with the development team via GitHub.
* Design essential components required to create screens, ensuring alignment with design system principles and user needs.

### Research

Initiated the project by conducting comprehensive research to uncover critical usability issues impacting both business performance and user satisfaction. Leveraged heuristic evaluation to assess the existing system against recognized usability principles, identifying areas for improvement. Additionally, delved into analytics data to gain insights into user behavior and interaction patterns. Engaged with the customer care department to gather real user feedback, understanding their pain points and frustrations firsthand. This multifaceted approach provided valuable insights that informed subsequent design decisions and optimizations.

### Ideation and Prototyping
Proceeded with the ideation phase, conducting thorough competitor analysis to identify areas of opportunity and best practices in the industry. Utilized low-fidelity screens to initiate discussions with the design team and stakeholders, fostering collaboration and alignment on design objectives. Throughout the process, iteratively refined concepts and solutions based on feedback and insights gathered from stakeholders.

Implemented interactive prototypes for complex user flows, such as selecting delivery date and time or creating automatic gift messages using AI. These prototypes served as invaluable tools for testing and validating design concepts, allowing for early identification of usability issues and opportunities for improvement.

 ### Challenges

A key challenge was conveying the importance of a design system to the team. To overcome this, I actively communicated the benefits, such as streamlined processes, consistency, and collaboration. By providing real-world examples and encouraging feedback, we established buy-in and alignment, paving the way for smoother design and development processes.

### Design Process

Throughout the design process, I relied on Figma as my primary design tool for creating high-fidelity designs and prototypes. Additionally, I utilized the Token Studio for Figma plugin to manage and maintain design tokens, ensuring consistency across screens and scalability in design systems.

I rolled up my sleeves and dove into the design.

### Shopping Cart

In crafting the "Cart" page, I aimed for a sleek user interface that facilitates seamless interaction. Key features include the ability for users to adjust item quantities and manage products easily. Delivery information is prominently displayed beneath the product list for quick reference. Additionally, a quick summary bottom sheet appears upon checkout, allowing users to review their preferences and make any necessary changes before proceeding. This design ensures a smooth shopping experience, prioritizing clarity and user control.

{{< figure 
    src="images/cart-page-general-looking.jpg"
    alt="Shopping Cart UX Design"
    caption="Users may take a moment to explore and fine-tune their selections before proceeding to checkout." >}}

{{< figure 
    src="images/cart-page-expired-delivery-date-or-time.jpg"
    alt="Shopping Cart UX Design, Updating the Delivery Date and Time"
    caption="No need to backtrack to the product detail page if the delivery slot has expired." >}}

### Gift Reminder

With the gift reminder feature, users can effortlessly create reminders for birthdays, Valentine's Day, Mother's Day, Father's Day, and more. 

Reminders can be set for one-time events or annually, providing flexibility for recurring occasions. Once created, reminders are conveniently stored under the 'Reminders' section on the 'Account' page, easily accessible for future reference. Upcoming reminders are highlighted at the top of the list, indicated with a green color for quick identification. Users can edit or remove reminders with ease using the intuitive interface.

{{< figure 
    src="images/gift-reminder-ux-design-adding-a-new-reminder.jpg"
    alt="Gift Reminder Feature UX Design, Adding a New Reminder"
    caption="Users may effortlessly create reminders for birthdays, Valentine's Day, Mother's Day, Father's Day, and more." >}}

{{< figure 
    src="images/gift-reminder-ux-design-list-view-of-the-available-reminders.jpg"
    alt="Gift Reminder UX Design, The List View of the Available Reminders"
    caption="Users may edit or remove reminders with ease using the intuitive interface." >}}

### Address Management

To enhance the user experience and streamline address management, I designed a seamless flow accessible from the "Account" page. Users can easily view, edit, or remove their saved addresses with a clear and intuitive interface.

When users tap the "Add New Address" button, they are taken to a screen where they can input a new recipient address. This screen offers two options: manually entering the address details or using the map view for a more interactive experience. This dual approach caters to both novice users who prefer straightforward input and advanced users who benefit from a more visual method.

{{< figure 
    src="images/address-management-ux-design-list-view.jpg"
    alt="Address Management UX Design, List View"
    caption="Users can navigate to the Addresses section from their Account page." >}}

{{< figure 
    src="images/address-management-ux-design-adding-a-new-address.jpg"
    alt="Address Management UX Design, Adding a New Address"
    caption="This screen offers two options: manually entering the address details or using the map view for a more interactive experience. This dual approach caters to both novice users who prefer straightforward input and advanced users who benefit from a more visual method." >}}

{{< figure 
    src="images/address-management-ux-design-deleting-an-available-address.jpg"
    alt="Address Management UX Design, Deleting an Available Address"
    caption="Users can see all their saved addresses clearly listed, with straightforward options to edit or remove each address. This ensures that managing addresses is hassle-free and intuitive." >}}

### Product Listing & Filtering

For the Product Listing page, my goal was to create a clean design that enhances user experience while providing essential information. The layout prominently displays the number of search results and visible filtering options, encouraging users to refine their searches easily. Impressive product cards were a crucial aspect, designed to attract attention and provide key details at a glance.

One of the most challenging parts was designing dynamic product cards that could accommodate various types of information such as "Free Delivery," "Joi Express," "Discounts," and other promotional details. These dynamic cards are flexible, allowing the marketing team to effectively communicate campaign and promotion information directly within the product listings.

By focusing on a streamlined and visually appealing design, the Product Listing page balances user needs with marketing objectives, ensuring a satisfying and efficient browsing experience.

{{< figure 
    src="images/product-listing-and-filtering-options-mobile-design-general-looking.jpg"
    alt="Product listing page and dynamic product cards mobile UX design."
    caption="The dynamic cards are flexible, allowing the marketing team to effectively communicate campaign and promotion information directly within the product listings." >}}

{{< figure 
    src="images/product-listing-and-filtering-options-mobile-design-filtering-applied.jpg"
    alt="Product Listing Page and Filtering Options Mobile UX Design"
    caption="Color selections include color labels and a tick icon to indicate when an option is selected. This design decision ensures that all users receive clear and accessible feedback, enhancing the overall usability of the filtering system." >}}

### Product Details

Designing the Product Details page presented unique challenges due to the potential for design clutter when displaying comprehensive gift details. Additionally, asking users to choose the delivery date and time immediately after tapping the "Add to Cart" button risked overwhelming them.

To address these issues, I focused on creating a clean and user-friendly interface. Key design decisions included implementing a carousel slider to showcase different angles of the product, ensuring users could view all product details without cluttering the page. 

To streamline the selection of delivery date and time, I incorporated automatically opening bottom sheets. These bottom sheets support users' micro tasks, making the process intuitive and less overwhelming. The overall design prioritizes simplicity and ease of use, enhancing the user experience by providing clear, accessible information and smooth interactions.

{{< figure 
    src="images/product-details-page-design-selecting-the-express-delivery.jpg"
    alt="Product Details UX Design, Choosing the Express Delivery"
    caption="Express delivery can be selected conveniently from the top of the list." >}}

{{< figure 
    src="images/product-details-page-design-changing-the-delivery-time.jpg"
    alt="Product Details UX Design, Changing the Delivery Time"
    caption="Users can easily update expired delivery times." >}}

{{< figure 
    src="images/product-details-page-design-selecting-a-custom-day-and-time-for-delivery.jpg"
    alt="Product Details UX Design, Choosing a Custom Delivery Day and Time"
    caption="Even complex user flows where users can select different dates using a calendar have been simplified with designs that are simple, intuitive, and support user micro-tasks." >}}

### Payment

In designing the Payment section, my primary focus was on clarity and ease of use. I implemented clear radio selections for payment options, allowing users to choose from previously saved credit cards, new debit or credit cards, Apple Pay, and other options like Careem Pay or Tabby.

To foster a sense of safety and trust, I included a "Secure Payment" label prominently within the payment options. This reassures users that their payment information is handled securely.

Once users tap the "Checkout" button, an "Order Summary" screen appears in a bottom sheet. This screen provides a detailed overview of their payment, enabling users to review and confirm the details. If everything looks correct, they can proceed by tapping the "Checkout" button again, which then leads to the "Order Received" success screen.

{{< figure 
    src="images/payment-mobile-ux-design-saved-cards-orders-summary-and-order-reveived.jpg"
    alt="Payment Mobile UX Design, Payment Options"
    caption="This design ensures a smooth and intuitive payment process, minimizing confusion and enhancing user confidence during the checkout." >}}

In conclusion, the design process for this project has been a journey of innovation and user-centricity. From crafting intuitive interfaces to implementing dynamic features, every decision has been carefully made to enhance the user experience. By prioritizing clarity, simplicity, and accessibility, as a team, we've created a platform that not only meets but exceeds user expectations.


Thank you for watching.