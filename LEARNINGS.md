# Learnings

- Planning the API shape first made the frontend easier to build.
- Sensitive fields like Aadhaar and PAN need extra care. I masked them in the list view.
- Duplicate checks are important for email, mobile, Aadhaar, and PAN.
- Soft delete is safer than hard delete because records can be restored.
- Using shadcn components made the UI more consistent and easier to build.
- The create-user form needed clear sections because the user enters a lot of information.
- Seeding data helped test pagination, search, status filters, and table layout.
- Running the full app with docker,backend and frontend together exposed integration issues faster.