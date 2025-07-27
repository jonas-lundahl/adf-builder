export const adf = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [
        {
          text: "Hello everyone!",
          type: "text",
        },
      ],
    },
    {
      type: "extension",
      attrs: {
        layout: "default",
        extensionType: "com.atlassian.confluence.macro.core",
        extensionKey: "recently-updated",
        parameters: {
          macroParams: {
            max: {
              value: "5",
            },
          },
          macroMetadata: {
            macroId: {
              value: "f9d6b4ce776b6df2ba84df23c64944e6",
            },
            schemaVersion: {
              value: "1",
            },
            title: "Recent updates",
          },
        },
        localId: "400db3c0-b048-4f72-9ee1-db2fc607c382",
      },
    },
    {
      type: "heading",
      attrs: {
        level: 2,
      },
      content: [
        {
          text: "🖐 Get in touch",
          type: "text",
        },
      ],
    },
    {
      type: "layoutSection",
      content: [
        {
          type: "layoutColumn",
          attrs: {
            width: 50,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "✉️ MyAmazingEmail.com",
                  type: "text",
                },
              ],
            },
          ],
        },
        {
          type: "layoutColumn",
          attrs: {
            width: 50,
          },
          content: [
            {
              type: "paragraph",
              content: [
                {
                  text: "🔗 @Jonas-Lundahl",
                  type: "text",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "paragraph",
      content: [
        {
          text: "Looking forward to meeting all of you! Happy 2025! Happy April 22nd! Happy June 20th! Happy July 27th!",
          type: "text",
        },
      ],
    },
    {
      type: "paragraph",
    },
  ],
  version: 1,
};
