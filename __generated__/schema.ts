import { z } from "zod";

import * as T from "./types.js";

/**
 * Definition: <code>alignment_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "alignment"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "align": {
 *           "enum": [
 *             "center",
 *             "end"
 *           ]
 *         }
 *       },
 *       "required": [
 *         "align"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.AlignmentMarkType
 */
export const AlignmentMarkSchema: z.ZodType<T.AlignmentMarkType> =
  z.strictObject({
    type: z.literal("alignment"),
    attrs: z.strictObject({
      align: z.union([z.literal("center"), z.literal("end")]),
    }),
  });

/**
 * Definition: <code>annotation_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "annotation"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "id": {
 *           "type": "string"
 *         },
 *         "annotationType": {
 *           "enum": [
 *             "inlineComment"
 *           ]
 *         }
 *       },
 *       "required": [
 *         "id",
 *         "annotationType"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.AnnotationMarkType
 */
export const AnnotationMarkSchema: z.ZodType<T.AnnotationMarkType> =
  z.strictObject({
    type: z.literal("annotation"),
    attrs: z.strictObject({
      id: z.string(),
      annotationType: z.literal("inlineComment"),
    }),
  });

/**
 * Definition: <code>backgroundColor_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "backgroundColor"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "color": {
 *           "pattern": "^#[0-9a-fA-F]{6}$",
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "color"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.BackgroundColorMarkType
 */
export const BackgroundColorMarkSchema: z.ZodType<T.BackgroundColorMarkType> =
  z.strictObject({
    type: z.literal("backgroundColor"),
    attrs: z.strictObject({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  });

/**
 * Definition: <code>blockCard_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "blockCard"
 *       ]
 *     },
 *     "attrs": {
 *       "anyOf": [
 *         {
 *           "type": "object",
 *           "properties": {
 *             "localId": {
 *               "type": "string"
 *             },
 *             "url": {
 *               "type": "string"
 *             },
 *             "datasource": {
 *               "type": "object",
 *               "additionalProperties": false,
 *               "properties": {
 *                 "id": {
 *                   "type": "string"
 *                 },
 *                 "parameters": {},
 *                 "views": {
 *                   "items": {
 *                     "type": "object",
 *                     "properties": {
 *                       "properties": {},
 *                       "type": {
 *                         "type": "string"
 *                       }
 *                     },
 *                     "required": [
 *                       "type"
 *                     ],
 *                     "additionalProperties": false
 *                   },
 *                   "minItems": 1,
 *                   "type": "array"
 *                 }
 *               },
 *               "required": [
 *                 "id",
 *                 "parameters",
 *                 "views"
 *               ]
 *             },
 *             "width": {
 *               "type": "number"
 *             },
 *             "layout": {
 *               "enum": [
 *                 "wide",
 *                 "full-width",
 *                 "center",
 *                 "wrap-right",
 *                 "wrap-left",
 *                 "align-end",
 *                 "align-start"
 *               ]
 *             }
 *           },
 *           "required": [
 *             "datasource"
 *           ],
 *           "additionalProperties": false
 *         },
 *         {
 *           "type": "object",
 *           "properties": {
 *             "url": {
 *               "type": "string"
 *             },
 *             "localId": {
 *               "type": "string"
 *             }
 *           },
 *           "required": [
 *             "url"
 *           ],
 *           "additionalProperties": false
 *         },
 *         {
 *           "type": "object",
 *           "properties": {
 *             "data": {},
 *             "localId": {
 *               "type": "string"
 *             }
 *           },
 *           "required": [
 *             "data"
 *           ],
 *           "additionalProperties": false
 *         }
 *       ]
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.BlockCardNodeType
 */
export const BlockCardNodeSchema: z.ZodType<T.BlockCardNodeType> =
  z.strictObject({
    type: z.literal("blockCard"),
    attrs: z.union([
      z.strictObject({
        localId: z.string().optional(),
        url: z.string().optional(),
        datasource: z.strictObject({
          id: z.string(),
          parameters: z.unknown(),
          views: z
            .array(
              z.strictObject({
                properties: z.unknown().optional(),
                type: z.string(),
              }),
            )
            .min(1),
        }),
        width: z.number().optional(),
        layout: z
          .union([
            z.literal("wide"),
            z.literal("full-width"),
            z.literal("center"),
            z.literal("wrap-right"),
            z.literal("wrap-left"),
            z.literal("align-end"),
            z.literal("align-start"),
          ])
          .optional(),
      }),
      z.strictObject({ url: z.string(), localId: z.string().optional() }),
      z.strictObject({ data: z.unknown(), localId: z.string().optional() }),
    ]),
  });

/**
 * Definition: <code>text_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "text"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array"
 *     },
 *     "text": {
 *       "minLength": 1,
 *       "type": "string"
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "text"
 *   ]
 * }
 * </pre>
 *
 * @see T.TextNodeType
 */
export const TextNodeSchema: z.ZodType<T.TextNodeType> = z.strictObject({
  type: z.literal("text"),
  marks: z.array(z.unknown()).optional(),
  text: z.string().min(1),
});

/**
 * Definition: <code>link_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "link"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "href": {
 *           "type": "string"
 *         },
 *         "title": {
 *           "type": "string"
 *         },
 *         "id": {
 *           "type": "string"
 *         },
 *         "collection": {
 *           "type": "string"
 *         },
 *         "occurrenceKey": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "href"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.LinkMarkType
 */
export const LinkMarkSchema: z.ZodType<T.LinkMarkType> = z.strictObject({
  type: z.literal("link"),
  attrs: z.strictObject({
    href: z.string(),
    title: z.string().optional(),
    id: z.string().optional(),
    collection: z.string().optional(),
    occurrenceKey: z.string().optional(),
  }),
});

/**
 * Definition: <code>em_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "em"
 *       ]
 *     }
 *   },
 *   "required": [
 *     "type"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.EmMarkType
 */
export const EmMarkSchema: z.ZodType<T.EmMarkType> = z.strictObject({
  type: z.literal("em"),
});

/**
 * Definition: <code>strong_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "strong"
 *       ]
 *     }
 *   },
 *   "required": [
 *     "type"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.StrongMarkType
 */
export const StrongMarkSchema: z.ZodType<T.StrongMarkType> = z.strictObject({
  type: z.literal("strong"),
});

/**
 * Definition: <code>strike_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "strike"
 *       ]
 *     }
 *   },
 *   "required": [
 *     "type"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.StrikeMarkType
 */
export const StrikeMarkSchema: z.ZodType<T.StrikeMarkType> = z.strictObject({
  type: z.literal("strike"),
});

/**
 * Definition: <code>subsup_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "subsup"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "type": {
 *           "enum": [
 *             "sub",
 *             "sup"
 *           ]
 *         }
 *       },
 *       "required": [
 *         "type"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.SubsupMarkType
 */
export const SubsupMarkSchema: z.ZodType<T.SubsupMarkType> = z.strictObject({
  type: z.literal("subsup"),
  attrs: z.strictObject({
    type: z.union([z.literal("sub"), z.literal("sup")]),
  }),
});

/**
 * Definition: <code>underline_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "underline"
 *       ]
 *     }
 *   },
 *   "required": [
 *     "type"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.UnderlineMarkType
 */
export const UnderlineMarkSchema: z.ZodType<T.UnderlineMarkType> =
  z.strictObject({ type: z.literal("underline") });

/**
 * Definition: <code>textColor_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "textColor"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "color": {
 *           "type": "string",
 *           "pattern": "^#[0-9a-fA-F]{6}$"
 *         }
 *       },
 *       "required": [
 *         "color"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.TextColorMarkType
 */
export const TextColorMarkSchema: z.ZodType<T.TextColorMarkType> =
  z.strictObject({
    type: z.literal("textColor"),
    attrs: z.strictObject({ color: z.string().regex(/^#[0-9a-fA-F]{6}$/) }),
  });

/**
 * Definition: <code>formatted_text_inline_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/text_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "anyOf": [
 *               {
 *                 "$ref": "#/definitions/link_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/em_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/strong_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/strike_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/subsup_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/underline_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/textColor_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/annotation_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/backgroundColor_mark"
 *               }
 *             ]
 *           }
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.FormattedTextInlineNodeType
 */
export const FormattedTextInlineNodeSchema: z.ZodType<T.FormattedTextInlineNodeType> =
  z.intersection(
    TextNodeSchema,
    z.object({
      marks: z
        .array(
          z.union([
            LinkMarkSchema,
            EmMarkSchema,
            StrongMarkSchema,
            StrikeMarkSchema,
            SubsupMarkSchema,
            UnderlineMarkSchema,
            TextColorMarkSchema,
            AnnotationMarkSchema,
            BackgroundColorMarkSchema,
          ]),
        )
        .optional(),
    }),
  );

/**
 * Definition: <code>code_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "code"
 *       ]
 *     }
 *   },
 *   "required": [
 *     "type"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.CodeMarkType
 */
export const CodeMarkSchema: z.ZodType<T.CodeMarkType> = z.strictObject({
  type: z.literal("code"),
});

/**
 * Definition: <code>code_inline_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/text_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "anyOf": [
 *               {
 *                 "$ref": "#/definitions/code_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/link_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/annotation_mark"
 *               }
 *             ]
 *           }
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.CodeInlineNodeType
 */
export const CodeInlineNodeSchema: z.ZodType<T.CodeInlineNodeType> =
  z.intersection(
    TextNodeSchema,
    z.object({
      marks: z
        .array(z.union([CodeMarkSchema, LinkMarkSchema, AnnotationMarkSchema]))
        .optional(),
    }),
  );

/**
 * Definition: <code>date_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "date"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "timestamp": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "timestamp"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.DateNodeType
 */
export const DateNodeSchema: z.ZodType<T.DateNodeType> = z.strictObject({
  type: z.literal("date"),
  attrs: z.strictObject({
    timestamp: z.string().min(1),
    localId: z.string().optional(),
  }),
});

/**
 * Definition: <code>emoji_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "emoji"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "shortName": {
 *           "type": "string"
 *         },
 *         "id": {
 *           "type": "string"
 *         },
 *         "text": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "shortName"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.EmojiNodeType
 */
export const EmojiNodeSchema: z.ZodType<T.EmojiNodeType> = z.strictObject({
  type: z.literal("emoji"),
  attrs: z.strictObject({
    shortName: z.string(),
    id: z.string().optional(),
    text: z.string().optional(),
    localId: z.string().optional(),
  }),
});

/**
 * Definition: <code>hardBreak_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "hardBreak"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "text": {
 *           "enum": [
 *             "\n"
 *           ]
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type"
 *   ]
 * }
 * </pre>
 *
 * @see T.HardBreakNodeType
 */
export const HardBreakNodeSchema: z.ZodType<T.HardBreakNodeType> =
  z.strictObject({
    type: z.literal("hardBreak"),
    attrs: z
      .strictObject({
        text: z.literal("\n").optional(),
        localId: z.string().optional(),
      })
      .optional(),
  });

/**
 * Definition: <code>inlineCard_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "inlineCard"
 *       ]
 *     },
 *     "attrs": {
 *       "anyOf": [
 *         {
 *           "type": "object",
 *           "properties": {
 *             "url": {
 *               "type": "string"
 *             },
 *             "localId": {
 *               "type": "string"
 *             }
 *           },
 *           "required": [
 *             "url"
 *           ],
 *           "additionalProperties": false
 *         },
 *         {
 *           "type": "object",
 *           "properties": {
 *             "data": {},
 *             "localId": {
 *               "type": "string"
 *             }
 *           },
 *           "required": [
 *             "data"
 *           ],
 *           "additionalProperties": false
 *         }
 *       ]
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.InlineCardNodeType
 */
export const InlineCardNodeSchema: z.ZodType<T.InlineCardNodeType> =
  z.strictObject({
    type: z.literal("inlineCard"),
    attrs: z.union([
      z.strictObject({ url: z.string(), localId: z.string().optional() }),
      z.strictObject({ data: z.unknown(), localId: z.string().optional() }),
    ]),
  });

/**
 * Definition: <code>mention_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "mention"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "id": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         },
 *         "text": {
 *           "type": "string"
 *         },
 *         "accessLevel": {
 *           "type": "string"
 *         },
 *         "userType": {
 *           "enum": [
 *             "DEFAULT",
 *             "SPECIAL",
 *             "APP"
 *           ]
 *         }
 *       },
 *       "required": [
 *         "id"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.MentionNodeType
 */
export const MentionNodeSchema: z.ZodType<T.MentionNodeType> = z.strictObject({
  type: z.literal("mention"),
  attrs: z.strictObject({
    id: z.string(),
    localId: z.string().optional(),
    text: z.string().optional(),
    accessLevel: z.string().optional(),
    userType: z
      .union([z.literal("DEFAULT"), z.literal("SPECIAL"), z.literal("APP")])
      .optional(),
  }),
});

/**
 * Definition: <code>placeholder_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "placeholder"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "text": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "text"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.PlaceholderNodeType
 */
export const PlaceholderNodeSchema: z.ZodType<T.PlaceholderNodeType> =
  z.strictObject({
    type: z.literal("placeholder"),
    attrs: z.strictObject({ text: z.string(), localId: z.string().optional() }),
  });

/**
 * Definition: <code>status_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "status"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "text": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "color": {
 *           "enum": [
 *             "neutral",
 *             "purple",
 *             "blue",
 *             "red",
 *             "yellow",
 *             "green"
 *           ]
 *         },
 *         "localId": {
 *           "type": "string"
 *         },
 *         "style": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "text",
 *         "color"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.StatusNodeType
 */
export const StatusNodeSchema: z.ZodType<T.StatusNodeType> = z.strictObject({
  type: z.literal("status"),
  attrs: z.strictObject({
    text: z.string().min(1),
    color: z.union([
      z.literal("neutral"),
      z.literal("purple"),
      z.literal("blue"),
      z.literal("red"),
      z.literal("yellow"),
      z.literal("green"),
    ]),
    localId: z.string().optional(),
    style: z.string().optional(),
  }),
});

/**
 * Definition: <code>inlineExtension_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "inlineExtension"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array"
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "extensionKey": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "extensionType": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "parameters": {},
 *         "text": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "minLength": 1,
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "extensionKey",
 *         "extensionType"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.InlineExtensionNodeType
 */
export const InlineExtensionNodeSchema: z.ZodType<T.InlineExtensionNodeType> =
  z.strictObject({
    type: z.literal("inlineExtension"),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({
      extensionKey: z.string().min(1),
      extensionType: z.string().min(1),
      parameters: z.unknown().optional(),
      text: z.string().optional(),
      localId: z.string().min(1).optional(),
    }),
  });

/**
 * Definition: <code>dataConsumer_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "dataConsumer"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "sources": {
 *           "type": "array",
 *           "items": {
 *             "type": "string"
 *           },
 *           "minItems": 1
 *         }
 *       },
 *       "required": [
 *         "sources"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.DataConsumerMarkType
 */
export const DataConsumerMarkSchema: z.ZodType<T.DataConsumerMarkType> =
  z.strictObject({
    type: z.literal("dataConsumer"),
    attrs: z.strictObject({ sources: z.array(z.string()).min(1) }),
  });

/**
 * Definition: <code>fragment_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "fragment"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "name": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "localId"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.FragmentMarkType
 */
export const FragmentMarkSchema: z.ZodType<T.FragmentMarkType> = z.strictObject(
  {
    type: z.literal("fragment"),
    attrs: z.strictObject({
      localId: z.string().min(1),
      name: z.string().optional(),
    }),
  },
);

/**
 * Definition: <code>inlineExtension_with_marks_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/inlineExtension_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "anyOf": [
 *               {
 *                 "$ref": "#/definitions/dataConsumer_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/fragment_mark"
 *               }
 *             ]
 *           }
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.InlineExtensionWithMarksNodeType
 */
export const InlineExtensionWithMarksNodeSchema: z.ZodType<T.InlineExtensionWithMarksNodeType> =
  z.intersection(
    InlineExtensionNodeSchema,
    z.object({
      marks: z
        .array(z.union([DataConsumerMarkSchema, FragmentMarkSchema]))
        .optional(),
    }),
  );

/**
 * Definition: <code>border_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "border"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "size": {
 *           "type": "number",
 *           "minimum": 1,
 *           "maximum": 3
 *         },
 *         "color": {
 *           "pattern": "^#[0-9a-fA-F]{8}$|^#[0-9a-fA-F]{6}$",
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "size",
 *         "color"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.BorderMarkType
 */
export const BorderMarkSchema: z.ZodType<T.BorderMarkType> = z.strictObject({
  type: z.literal("border"),
  attrs: z.strictObject({
    size: z.number().min(1).max(3),
    color: z.string().regex(/^#[0-9a-fA-F]{8}$|^#[0-9a-fA-F]{6}$/),
  }),
});

/**
 * Definition: <code>mediaInline_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "mediaInline"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array",
 *       "items": {
 *         "anyOf": [
 *           {
 *             "$ref": "#/definitions/link_mark"
 *           },
 *           {
 *             "$ref": "#/definitions/annotation_mark"
 *           },
 *           {
 *             "$ref": "#/definitions/border_mark"
 *           }
 *         ]
 *       }
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "type": {
 *           "enum": [
 *             "link",
 *             "file",
 *             "image"
 *           ]
 *         },
 *         "localId": {
 *           "type": "string"
 *         },
 *         "id": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "alt": {
 *           "type": "string"
 *         },
 *         "collection": {
 *           "type": "string"
 *         },
 *         "occurrenceKey": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "width": {
 *           "type": "number"
 *         },
 *         "height": {
 *           "type": "number"
 *         },
 *         "data": {}
 *       },
 *       "required": [
 *         "id",
 *         "collection"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.MediaInlineNodeType
 */
export const MediaInlineNodeSchema: z.ZodType<T.MediaInlineNodeType> =
  z.strictObject({
    type: z.literal("mediaInline"),
    marks: z
      .array(z.union([LinkMarkSchema, AnnotationMarkSchema, BorderMarkSchema]))
      .optional(),
    attrs: z.strictObject({
      type: z
        .union([z.literal("link"), z.literal("file"), z.literal("image")])
        .optional(),
      localId: z.string().optional(),
      id: z.string().min(1),
      alt: z.string().optional(),
      collection: z.string(),
      occurrenceKey: z.string().min(1).optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      data: z.unknown().optional(),
    }),
  });

/**
 * Definition: <code>inline_node</code>
 *
 * <pre>
 * {
 *   "anyOf": [
 *     {
 *       "$ref": "#/definitions/formatted_text_inline_node"
 *     },
 *     {
 *       "$ref": "#/definitions/code_inline_node"
 *     },
 *     {
 *       "$ref": "#/definitions/date_node"
 *     },
 *     {
 *       "$ref": "#/definitions/emoji_node"
 *     },
 *     {
 *       "$ref": "#/definitions/hardBreak_node"
 *     },
 *     {
 *       "$ref": "#/definitions/inlineCard_node"
 *     },
 *     {
 *       "$ref": "#/definitions/mention_node"
 *     },
 *     {
 *       "$ref": "#/definitions/placeholder_node"
 *     },
 *     {
 *       "$ref": "#/definitions/status_node"
 *     },
 *     {
 *       "$ref": "#/definitions/inlineExtension_with_marks_node"
 *     },
 *     {
 *       "$ref": "#/definitions/mediaInline_node"
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.InlineNodeType
 */
export const InlineNodeSchema: z.ZodType<T.InlineNodeType> = z.union([
  FormattedTextInlineNodeSchema,
  CodeInlineNodeSchema,
  DateNodeSchema,
  EmojiNodeSchema,
  HardBreakNodeSchema,
  InlineCardNodeSchema,
  MentionNodeSchema,
  PlaceholderNodeSchema,
  StatusNodeSchema,
  InlineExtensionWithMarksNodeSchema,
  MediaInlineNodeSchema,
]);

/**
 * Definition: <code>paragraph_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "paragraph"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array"
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/inline_node"
 *       }
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type"
 *   ]
 * }
 * </pre>
 *
 * @see T.ParagraphNodeType
 */
export const ParagraphNodeSchema: z.ZodType<T.ParagraphNodeType> =
  z.strictObject({
    type: z.literal("paragraph"),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(InlineNodeSchema).optional(),
  });

/**
 * Definition: <code>paragraph_with_no_marks_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/paragraph_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "maxItems": 0
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.ParagraphWithNoMarksNodeType
 */
export const ParagraphWithNoMarksNodeSchema: z.ZodType<T.ParagraphWithNoMarksNodeType> =
  z.intersection(
    ParagraphNodeSchema,
    z.object({ marks: z.array(z.unknown()).optional() }),
  );

/**
 * Definition: <code>paragraph_with_alignment_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/paragraph_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "$ref": "#/definitions/alignment_mark"
 *           }
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.ParagraphWithAlignmentNodeType
 */
export const ParagraphWithAlignmentNodeSchema: z.ZodType<T.ParagraphWithAlignmentNodeType> =
  z.intersection(
    ParagraphNodeSchema,
    z.object({ marks: z.array(AlignmentMarkSchema).optional() }),
  );

/**
 * Definition: <code>indentation_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "indentation"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "level": {
 *           "type": "number",
 *           "minimum": 1,
 *           "maximum": 6
 *         }
 *       },
 *       "required": [
 *         "level"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.IndentationMarkType
 */
export const IndentationMarkSchema: z.ZodType<T.IndentationMarkType> =
  z.strictObject({
    type: z.literal("indentation"),
    attrs: z.strictObject({ level: z.number().min(1).max(6) }),
  });

/**
 * Definition: <code>paragraph_with_indentation_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/paragraph_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "$ref": "#/definitions/indentation_mark"
 *           }
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.ParagraphWithIndentationNodeType
 */
export const ParagraphWithIndentationNodeSchema: z.ZodType<T.ParagraphWithIndentationNodeType> =
  z.intersection(
    ParagraphNodeSchema,
    z.object({ marks: z.array(IndentationMarkSchema).optional() }),
  );

/**
 * Definition: <code>mediaSingle_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "mediaSingle"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/link_mark"
 *       }
 *     },
 *     "attrs": {
 *       "anyOf": [
 *         {
 *           "type": "object",
 *           "properties": {
 *             "localId": {
 *               "type": "string"
 *             },
 *             "width": {
 *               "type": "number",
 *               "minimum": 0,
 *               "maximum": 100
 *             },
 *             "layout": {
 *               "enum": [
 *                 "wide",
 *                 "full-width",
 *                 "center",
 *                 "wrap-right",
 *                 "wrap-left",
 *                 "align-end",
 *                 "align-start"
 *               ]
 *             },
 *             "widthType": {
 *               "enum": [
 *                 "percentage"
 *               ]
 *             }
 *           },
 *           "required": [
 *             "layout"
 *           ],
 *           "additionalProperties": false
 *         },
 *         {
 *           "type": "object",
 *           "properties": {
 *             "localId": {
 *               "type": "string"
 *             },
 *             "width": {
 *               "type": "number",
 *               "minimum": 0
 *             },
 *             "widthType": {
 *               "enum": [
 *                 "pixel"
 *               ]
 *             },
 *             "layout": {
 *               "enum": [
 *                 "wide",
 *                 "full-width",
 *                 "center",
 *                 "wrap-right",
 *                 "wrap-left",
 *                 "align-end",
 *                 "align-start"
 *               ]
 *             }
 *           },
 *           "required": [
 *             "width",
 *             "widthType",
 *             "layout"
 *           ],
 *           "additionalProperties": false
 *         }
 *       ]
 *     }
 *   },
 *   "additionalProperties": true,
 *   "required": [
 *     "type"
 *   ]
 * }
 * </pre>
 *
 * @see T.MediaSingleNodeType
 */
export const MediaSingleNodeSchema: z.ZodType<T.MediaSingleNodeType> = z.object(
  {
    type: z.literal("mediaSingle"),
    marks: z.array(LinkMarkSchema).optional(),
    attrs: z
      .union([
        z.strictObject({
          localId: z.string().optional(),
          width: z.number().max(100).optional(),
          layout: z.union([
            z.literal("wide"),
            z.literal("full-width"),
            z.literal("center"),
            z.literal("wrap-right"),
            z.literal("wrap-left"),
            z.literal("align-end"),
            z.literal("align-start"),
          ]),
          widthType: z.literal("percentage").optional(),
        }),
        z.strictObject({
          localId: z.string().optional(),
          width: z.number(),
          widthType: z.literal("pixel"),
          layout: z.union([
            z.literal("wide"),
            z.literal("full-width"),
            z.literal("center"),
            z.literal("wrap-right"),
            z.literal("wrap-left"),
            z.literal("align-end"),
            z.literal("align-start"),
          ]),
        }),
      ])
      .optional(),
  },
);

/**
 * Definition: <code>media_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "media"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array",
 *       "items": {
 *         "anyOf": [
 *           {
 *             "$ref": "#/definitions/link_mark"
 *           },
 *           {
 *             "$ref": "#/definitions/annotation_mark"
 *           },
 *           {
 *             "$ref": "#/definitions/border_mark"
 *           }
 *         ]
 *       }
 *     },
 *     "attrs": {
 *       "anyOf": [
 *         {
 *           "type": "object",
 *           "properties": {
 *             "type": {
 *               "enum": [
 *                 "link",
 *                 "file"
 *               ]
 *             },
 *             "localId": {
 *               "type": "string"
 *             },
 *             "id": {
 *               "minLength": 1,
 *               "type": "string"
 *             },
 *             "alt": {
 *               "type": "string"
 *             },
 *             "collection": {
 *               "type": "string"
 *             },
 *             "height": {
 *               "type": "number"
 *             },
 *             "occurrenceKey": {
 *               "minLength": 1,
 *               "type": "string"
 *             },
 *             "width": {
 *               "type": "number"
 *             }
 *           },
 *           "required": [
 *             "type",
 *             "id",
 *             "collection"
 *           ],
 *           "additionalProperties": false
 *         },
 *         {
 *           "type": "object",
 *           "properties": {
 *             "type": {
 *               "enum": [
 *                 "external"
 *               ]
 *             },
 *             "localId": {
 *               "type": "string"
 *             },
 *             "alt": {
 *               "type": "string"
 *             },
 *             "height": {
 *               "type": "number"
 *             },
 *             "width": {
 *               "type": "number"
 *             },
 *             "url": {
 *               "type": "string"
 *             }
 *           },
 *           "required": [
 *             "type",
 *             "url"
 *           ],
 *           "additionalProperties": false
 *         }
 *       ]
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.MediaNodeType
 */
export const MediaNodeSchema: z.ZodType<T.MediaNodeType> = z.strictObject({
  type: z.literal("media"),
  marks: z
    .array(z.union([LinkMarkSchema, AnnotationMarkSchema, BorderMarkSchema]))
    .optional(),
  attrs: z.union([
    z.strictObject({
      type: z.union([z.literal("link"), z.literal("file")]),
      localId: z.string().optional(),
      id: z.string().min(1),
      alt: z.string().optional(),
      collection: z.string(),
      height: z.number().optional(),
      occurrenceKey: z.string().min(1).optional(),
      width: z.number().optional(),
    }),
    z.strictObject({
      type: z.literal("external"),
      localId: z.string().optional(),
      alt: z.string().optional(),
      height: z.number().optional(),
      width: z.number().optional(),
      url: z.string(),
    }),
  ]),
});

/**
 * Definition: <code>caption_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "caption"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "anyOf": [
 *           {
 *             "$ref": "#/definitions/hardBreak_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mention_node"
 *           },
 *           {
 *             "$ref": "#/definitions/emoji_node"
 *           },
 *           {
 *             "$ref": "#/definitions/date_node"
 *           },
 *           {
 *             "$ref": "#/definitions/placeholder_node"
 *           },
 *           {
 *             "$ref": "#/definitions/inlineCard_node"
 *           },
 *           {
 *             "$ref": "#/definitions/status_node"
 *           },
 *           {
 *             "$ref": "#/definitions/formatted_text_inline_node"
 *           },
 *           {
 *             "$ref": "#/definitions/code_inline_node"
 *           }
 *         ]
 *       }
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type"
 *   ]
 * }
 * </pre>
 *
 * @see T.CaptionNodeType
 */
export const CaptionNodeSchema: z.ZodType<T.CaptionNodeType> = z.strictObject({
  type: z.literal("caption"),
  attrs: z.strictObject({ localId: z.string().optional() }).optional(),
  content: z
    .array(
      z.union([
        HardBreakNodeSchema,
        MentionNodeSchema,
        EmojiNodeSchema,
        DateNodeSchema,
        PlaceholderNodeSchema,
        InlineCardNodeSchema,
        StatusNodeSchema,
        FormattedTextInlineNodeSchema,
        CodeInlineNodeSchema,
      ]),
    )
    .optional(),
});

/**
 * Definition: <code>mediaSingle_caption_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/mediaSingle_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "content": {
 *           "type": "array",
 *           "items": [
 *             {
 *               "$ref": "#/definitions/media_node"
 *             },
 *             {
 *               "$ref": "#/definitions/caption_node"
 *             }
 *           ],
 *           "minItems": 1,
 *           "maxItems": 2
 *         }
 *       },
 *       "required": [
 *         "content"
 *       ],
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.MediaSingleCaptionNodeType
 */
export const MediaSingleCaptionNodeSchema: z.ZodType<T.MediaSingleCaptionNodeType> =
  z.intersection(
    MediaSingleNodeSchema,
    z.object({
      content: z
        .array(z.tuple([MediaNodeSchema, CaptionNodeSchema]))
        .min(1)
        .max(2),
    }),
  );

/**
 * Definition: <code>mediaSingle_full_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/mediaSingle_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "content": {
 *           "type": "array",
 *           "items": {
 *             "$ref": "#/definitions/media_node"
 *           },
 *           "minItems": 1,
 *           "maxItems": 1
 *         }
 *       },
 *       "required": [
 *         "content"
 *       ],
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.MediaSingleFullNodeType
 */
export const MediaSingleFullNodeSchema: z.ZodType<T.MediaSingleFullNodeType> =
  z.intersection(
    MediaSingleNodeSchema,
    z.object({ content: z.array(MediaNodeSchema).min(1).max(1) }),
  );

/**
 * Definition: <code>text_with_no_marks_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/text_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "maxItems": 0
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.TextWithNoMarksNodeType
 */
export const TextWithNoMarksNodeSchema: z.ZodType<T.TextWithNoMarksNodeType> =
  z.intersection(
    TextNodeSchema,
    z.object({ marks: z.array(z.unknown()).optional() }),
  );

/**
 * Definition: <code>codeBlock_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "codeBlock"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array",
 *       "maxItems": 0
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "language": {
 *           "type": "string"
 *         },
 *         "uniqueId": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/text_with_no_marks_node"
 *       }
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type"
 *   ]
 * }
 * </pre>
 *
 * @see T.CodeBlockNodeType
 */
export const CodeBlockNodeSchema: z.ZodType<T.CodeBlockNodeType> =
  z.strictObject({
    type: z.literal("codeBlock"),
    marks: z.array(z.unknown()).optional(),
    attrs: z
      .strictObject({
        language: z.string().optional(),
        uniqueId: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z.array(TextWithNoMarksNodeSchema).optional(),
  });

/**
 * Definition: <code>taskItem_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "taskItem"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         },
 *         "state": {
 *           "enum": [
 *             "TODO",
 *             "DONE"
 *           ]
 *         }
 *       },
 *       "required": [
 *         "localId",
 *         "state"
 *       ],
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/inline_node"
 *       }
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.TaskItemNodeType
 */
export const TaskItemNodeSchema: z.ZodType<T.TaskItemNodeType> = z.strictObject(
  {
    type: z.literal("taskItem"),
    attrs: z.strictObject({
      localId: z.string(),
      state: z.union([z.literal("TODO"), z.literal("DONE")]),
    }),
    content: z.array(InlineNodeSchema).optional(),
  },
);

/**
 * Definition: <code>taskList_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "taskList"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "localId"
 *       ],
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": [
 *         {
 *           "$ref": "#/definitions/taskItem_node"
 *         },
 *         {
 *           "anyOf": [
 *             {
 *               "$ref": "#/definitions/taskItem_node"
 *             },
 *             {
 *               "$ref": "#/definitions/taskList_node"
 *             }
 *           ]
 *         }
 *       ],
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.TaskListNodeType
 */
export const TaskListNodeSchema: z.ZodType<T.TaskListNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.literal("taskList"),
    attrs: z.strictObject({ localId: z.string() }),
    content: z
      .array(
        z.tuple([
          TaskItemNodeSchema,
          z.union([TaskItemNodeSchema, TaskListNodeSchema]),
        ]),
      )
      .min(1),
  }),
);

/**
 * Definition: <code>extension_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "extension"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array"
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "extensionKey": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "extensionType": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "parameters": {},
 *         "text": {
 *           "type": "string"
 *         },
 *         "layout": {
 *           "enum": [
 *             "wide",
 *             "full-width",
 *             "default"
 *           ]
 *         },
 *         "localId": {
 *           "minLength": 1,
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "extensionKey",
 *         "extensionType"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.ExtensionNodeType
 */
export const ExtensionNodeSchema: z.ZodType<T.ExtensionNodeType> =
  z.strictObject({
    type: z.literal("extension"),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({
      extensionKey: z.string().min(1),
      extensionType: z.string().min(1),
      parameters: z.unknown().optional(),
      text: z.string().optional(),
      layout: z
        .union([
          z.literal("wide"),
          z.literal("full-width"),
          z.literal("default"),
        ])
        .optional(),
      localId: z.string().min(1).optional(),
    }),
  });

/**
 * Definition: <code>extension_with_marks_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/extension_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "anyOf": [
 *               {
 *                 "$ref": "#/definitions/dataConsumer_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/fragment_mark"
 *               }
 *             ]
 *           }
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.ExtensionWithMarksNodeType
 */
export const ExtensionWithMarksNodeSchema: z.ZodType<T.ExtensionWithMarksNodeType> =
  z.intersection(
    ExtensionNodeSchema,
    z.object({
      marks: z
        .array(z.union([DataConsumerMarkSchema, FragmentMarkSchema]))
        .optional(),
    }),
  );

/**
 * Definition: <code>orderedList_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "orderedList"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "order": {
 *           "type": "number",
 *           "minimum": 0
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/listItem_node"
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.OrderedListNodeType
 */
export const OrderedListNodeSchema: z.ZodType<T.OrderedListNodeType> =
  z.strictObject({
    type: z.literal("orderedList"),
    attrs: z
      .strictObject({
        order: z.number().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z.array(ListItemNodeSchema).min(1),
  });

/**
 * Definition: <code>listItem_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "listItem"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": [
 *         {
 *           "anyOf": [
 *             {
 *               "$ref": "#/definitions/paragraph_with_no_marks_node"
 *             },
 *             {
 *               "$ref": "#/definitions/mediaSingle_caption_node"
 *             },
 *             {
 *               "$ref": "#/definitions/mediaSingle_full_node"
 *             },
 *             {
 *               "$ref": "#/definitions/codeBlock_node"
 *             },
 *             {
 *               "$ref": "#/definitions/extension_with_marks_node"
 *             }
 *           ]
 *         },
 *         {
 *           "anyOf": [
 *             {
 *               "$ref": "#/definitions/paragraph_with_no_marks_node"
 *             },
 *             {
 *               "$ref": "#/definitions/bulletList_node"
 *             },
 *             {
 *               "$ref": "#/definitions/orderedList_node"
 *             },
 *             {
 *               "$ref": "#/definitions/taskList_node"
 *             },
 *             {
 *               "$ref": "#/definitions/mediaSingle_caption_node"
 *             },
 *             {
 *               "$ref": "#/definitions/mediaSingle_full_node"
 *             },
 *             {
 *               "$ref": "#/definitions/codeBlock_node"
 *             },
 *             {
 *               "$ref": "#/definitions/extension_with_marks_node"
 *             }
 *           ]
 *         }
 *       ],
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.ListItemNodeType
 */
export const ListItemNodeSchema: z.ZodType<T.ListItemNodeType> = z.lazy(() =>
  z.strictObject({
    type: z.literal("listItem"),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z
      .array(
        z.tuple([
          z.union([
            ParagraphWithNoMarksNodeSchema,
            MediaSingleCaptionNodeSchema,
            MediaSingleFullNodeSchema,
            CodeBlockNodeSchema,
            ExtensionWithMarksNodeSchema,
          ]),
          z.union([
            ParagraphWithNoMarksNodeSchema,
            BulletListNodeSchema,
            OrderedListNodeSchema,
            TaskListNodeSchema,
            MediaSingleCaptionNodeSchema,
            MediaSingleFullNodeSchema,
            CodeBlockNodeSchema,
            ExtensionWithMarksNodeSchema,
          ]),
        ]),
      )
      .min(1),
  }),
);

/**
 * Definition: <code>bulletList_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "bulletList"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/listItem_node"
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.BulletListNodeType
 */
export const BulletListNodeSchema: z.ZodType<T.BulletListNodeType> = z.lazy(
  () =>
    z.strictObject({
      type: z.literal("bulletList"),
      attrs: z.strictObject({ localId: z.string().optional() }).optional(),
      content: z.array(ListItemNodeSchema).min(1),
    }),
);

/**
 * Definition: <code>heading_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "heading"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array"
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "level": {
 *           "type": "number",
 *           "minimum": 1,
 *           "maximum": 6
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "level"
 *       ],
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/inline_node"
 *       }
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.HeadingNodeType
 */
export const HeadingNodeSchema: z.ZodType<T.HeadingNodeType> = z.strictObject({
  type: z.literal("heading"),
  marks: z.array(z.unknown()).optional(),
  attrs: z.strictObject({
    level: z.number().min(1).max(6),
    localId: z.string().optional(),
  }),
  content: z.array(InlineNodeSchema).optional(),
});

/**
 * Definition: <code>heading_with_no_marks_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/heading_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "maxItems": 0
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.HeadingWithNoMarksNodeType
 */
export const HeadingWithNoMarksNodeSchema: z.ZodType<T.HeadingWithNoMarksNodeType> =
  z.intersection(
    HeadingNodeSchema,
    z.object({ marks: z.array(z.unknown()).optional() }),
  );

/**
 * Definition: <code>heading_with_alignment_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/heading_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "$ref": "#/definitions/alignment_mark"
 *           }
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.HeadingWithAlignmentNodeType
 */
export const HeadingWithAlignmentNodeSchema: z.ZodType<T.HeadingWithAlignmentNodeType> =
  z.intersection(
    HeadingNodeSchema,
    z.object({ marks: z.array(AlignmentMarkSchema).optional() }),
  );

/**
 * Definition: <code>heading_with_indentation_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/heading_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "$ref": "#/definitions/indentation_mark"
 *           }
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.HeadingWithIndentationNodeType
 */
export const HeadingWithIndentationNodeSchema: z.ZodType<T.HeadingWithIndentationNodeType> =
  z.intersection(
    HeadingNodeSchema,
    z.object({ marks: z.array(IndentationMarkSchema).optional() }),
  );

/**
 * Definition: <code>mediaGroup_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "mediaGroup"
 *       ]
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/media_node"
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.MediaGroupNodeType
 */
export const MediaGroupNodeSchema: z.ZodType<T.MediaGroupNodeType> =
  z.strictObject({
    type: z.literal("mediaGroup"),
    content: z.array(MediaNodeSchema).min(1),
  });

/**
 * Definition: <code>decisionItem_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "decisionItem"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         },
 *         "state": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "localId",
 *         "state"
 *       ],
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/inline_node"
 *       }
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.DecisionItemNodeType
 */
export const DecisionItemNodeSchema: z.ZodType<T.DecisionItemNodeType> =
  z.strictObject({
    type: z.literal("decisionItem"),
    attrs: z.strictObject({ localId: z.string(), state: z.string() }),
    content: z.array(InlineNodeSchema).optional(),
  });

/**
 * Definition: <code>decisionList_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "decisionList"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "localId"
 *       ],
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/decisionItem_node"
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.DecisionListNodeType
 */
export const DecisionListNodeSchema: z.ZodType<T.DecisionListNodeType> =
  z.strictObject({
    type: z.literal("decisionList"),
    attrs: z.strictObject({ localId: z.string() }),
    content: z.array(DecisionItemNodeSchema).min(1),
  });

/**
 * Definition: <code>rule_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "rule"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type"
 *   ]
 * }
 * </pre>
 *
 * @see T.RuleNodeType
 */
export const RuleNodeSchema: z.ZodType<T.RuleNodeType> = z.strictObject({
  type: z.literal("rule"),
  attrs: z.strictObject({ localId: z.string().optional() }).optional(),
});

/**
 * Definition: <code>panel_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "panel"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "panelType": {
 *           "enum": [
 *             "info",
 *             "note",
 *             "tip",
 *             "warning",
 *             "error",
 *             "success",
 *             "custom"
 *           ]
 *         },
 *         "panelIcon": {
 *           "type": "string"
 *         },
 *         "panelIconId": {
 *           "type": "string"
 *         },
 *         "panelIconText": {
 *           "type": "string"
 *         },
 *         "panelColor": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "panelType"
 *       ],
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "anyOf": [
 *           {
 *             "$ref": "#/definitions/paragraph_with_no_marks_node"
 *           },
 *           {
 *             "$ref": "#/definitions/heading_with_no_marks_node"
 *           },
 *           {
 *             "$ref": "#/definitions/bulletList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/orderedList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/blockCard_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mediaGroup_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mediaSingle_caption_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mediaSingle_full_node"
 *           },
 *           {
 *             "$ref": "#/definitions/codeBlock_node"
 *           },
 *           {
 *             "$ref": "#/definitions/taskList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/rule_node"
 *           },
 *           {
 *             "$ref": "#/definitions/decisionList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/extension_with_marks_node"
 *           }
 *         ]
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.PanelNodeType
 */
export const PanelNodeSchema: z.ZodType<T.PanelNodeType> = z.strictObject({
  type: z.literal("panel"),
  attrs: z.strictObject({
    panelType: z.union([
      z.literal("info"),
      z.literal("note"),
      z.literal("tip"),
      z.literal("warning"),
      z.literal("error"),
      z.literal("success"),
      z.literal("custom"),
    ]),
    panelIcon: z.string().optional(),
    panelIconId: z.string().optional(),
    panelIconText: z.string().optional(),
    panelColor: z.string().optional(),
    localId: z.string().optional(),
  }),
  content: z
    .array(
      z.union([
        ParagraphWithNoMarksNodeSchema,
        HeadingWithNoMarksNodeSchema,
        BulletListNodeSchema,
        OrderedListNodeSchema,
        BlockCardNodeSchema,
        MediaGroupNodeSchema,
        MediaSingleCaptionNodeSchema,
        MediaSingleFullNodeSchema,
        CodeBlockNodeSchema,
        TaskListNodeSchema,
        RuleNodeSchema,
        DecisionListNodeSchema,
        ExtensionWithMarksNodeSchema,
      ]),
    )
    .min(1),
});

/**
 * Definition: <code>blockquote_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "blockquote"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "anyOf": [
 *           {
 *             "$ref": "#/definitions/paragraph_with_no_marks_node"
 *           },
 *           {
 *             "$ref": "#/definitions/orderedList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/bulletList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/codeBlock_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mediaSingle_caption_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mediaSingle_full_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mediaGroup_node"
 *           },
 *           {
 *             "$ref": "#/definitions/extension_with_marks_node"
 *           }
 *         ]
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.BlockquoteNodeType
 */
export const BlockquoteNodeSchema: z.ZodType<T.BlockquoteNodeType> =
  z.strictObject({
    type: z.literal("blockquote"),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z
      .array(
        z.union([
          ParagraphWithNoMarksNodeSchema,
          OrderedListNodeSchema,
          BulletListNodeSchema,
          CodeBlockNodeSchema,
          MediaSingleCaptionNodeSchema,
          MediaSingleFullNodeSchema,
          MediaGroupNodeSchema,
          ExtensionWithMarksNodeSchema,
        ]),
      )
      .min(1),
  });

/**
 * Definition: <code>embedCard_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "embedCard"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "url": {
 *           "type": "string"
 *         },
 *         "layout": {
 *           "enum": [
 *             "wide",
 *             "full-width",
 *             "center",
 *             "wrap-right",
 *             "wrap-left",
 *             "align-end",
 *             "align-start"
 *           ]
 *         },
 *         "width": {
 *           "type": "number",
 *           "maximum": 100,
 *           "minimum": 0
 *         },
 *         "originalHeight": {
 *           "type": "number"
 *         },
 *         "originalWidth": {
 *           "type": "number"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "url",
 *         "layout"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.EmbedCardNodeType
 */
export const EmbedCardNodeSchema: z.ZodType<T.EmbedCardNodeType> =
  z.strictObject({
    type: z.literal("embedCard"),
    attrs: z.strictObject({
      url: z.string(),
      layout: z.union([
        z.literal("wide"),
        z.literal("full-width"),
        z.literal("center"),
        z.literal("wrap-right"),
        z.literal("wrap-left"),
        z.literal("align-end"),
        z.literal("align-start"),
      ]),
      width: z.number().max(100).optional(),
      originalHeight: z.number().optional(),
      originalWidth: z.number().optional(),
      localId: z.string().optional(),
    }),
  });

/**
 * Definition: <code>nestedExpand_content</code>
 *
 * <pre>
 * {
 *   "type": "array",
 *   "items": {
 *     "anyOf": [
 *       {
 *         "$ref": "#/definitions/paragraph_with_no_marks_node"
 *       },
 *       {
 *         "$ref": "#/definitions/heading_with_no_marks_node"
 *       },
 *       {
 *         "$ref": "#/definitions/mediaSingle_caption_node"
 *       },
 *       {
 *         "$ref": "#/definitions/mediaSingle_full_node"
 *       },
 *       {
 *         "$ref": "#/definitions/mediaGroup_node"
 *       },
 *       {
 *         "$ref": "#/definitions/codeBlock_node"
 *       },
 *       {
 *         "$ref": "#/definitions/bulletList_node"
 *       },
 *       {
 *         "$ref": "#/definitions/orderedList_node"
 *       },
 *       {
 *         "$ref": "#/definitions/taskList_node"
 *       },
 *       {
 *         "$ref": "#/definitions/decisionList_node"
 *       },
 *       {
 *         "$ref": "#/definitions/rule_node"
 *       },
 *       {
 *         "$ref": "#/definitions/panel_node"
 *       },
 *       {
 *         "$ref": "#/definitions/blockquote_node"
 *       },
 *       {
 *         "$ref": "#/definitions/extension_with_marks_node"
 *       }
 *     ]
 *   },
 *   "minItems": 1
 * }
 * </pre>
 *
 * @see T.NestedExpandContentType
 */
export const NestedExpandContentSchema: z.ZodType<T.NestedExpandContentType> = z
  .array(
    z.union([
      ParagraphWithNoMarksNodeSchema,
      HeadingWithNoMarksNodeSchema,
      MediaSingleCaptionNodeSchema,
      MediaSingleFullNodeSchema,
      MediaGroupNodeSchema,
      CodeBlockNodeSchema,
      BulletListNodeSchema,
      OrderedListNodeSchema,
      TaskListNodeSchema,
      DecisionListNodeSchema,
      RuleNodeSchema,
      PanelNodeSchema,
      BlockquoteNodeSchema,
      ExtensionWithMarksNodeSchema,
    ]),
  )
  .min(1);

/**
 * Definition: <code>nestedExpand_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "nestedExpand"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "title": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "$ref": "#/definitions/nestedExpand_content"
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content",
 *     "attrs"
 *   ]
 * }
 * </pre>
 *
 * @see T.NestedExpandNodeType
 */
export const NestedExpandNodeSchema: z.ZodType<T.NestedExpandNodeType> =
  z.strictObject({
    type: z.literal("nestedExpand"),
    attrs: z.strictObject({
      title: z.string().optional(),
      localId: z.string().optional(),
    }),
    content: NestedExpandContentSchema,
  });

/**
 * Definition: <code>nestedExpand_with_no_marks_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/nestedExpand_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "maxItems": 0
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.NestedExpandWithNoMarksNodeType
 */
export const NestedExpandWithNoMarksNodeSchema: z.ZodType<T.NestedExpandWithNoMarksNodeType> =
  z.intersection(
    NestedExpandNodeSchema,
    z.object({ marks: z.array(z.unknown()).optional() }),
  );

/**
 * Definition: <code>table_cell_content</code>
 *
 * <pre>
 * {
 *   "type": "array",
 *   "items": {
 *     "anyOf": [
 *       {
 *         "$ref": "#/definitions/paragraph_with_no_marks_node"
 *       },
 *       {
 *         "$ref": "#/definitions/paragraph_with_alignment_node"
 *       },
 *       {
 *         "$ref": "#/definitions/panel_node"
 *       },
 *       {
 *         "$ref": "#/definitions/blockquote_node"
 *       },
 *       {
 *         "$ref": "#/definitions/orderedList_node"
 *       },
 *       {
 *         "$ref": "#/definitions/bulletList_node"
 *       },
 *       {
 *         "$ref": "#/definitions/rule_node"
 *       },
 *       {
 *         "$ref": "#/definitions/heading_with_no_marks_node"
 *       },
 *       {
 *         "$ref": "#/definitions/heading_with_alignment_node"
 *       },
 *       {
 *         "$ref": "#/definitions/heading_with_indentation_node"
 *       },
 *       {
 *         "$ref": "#/definitions/codeBlock_node"
 *       },
 *       {
 *         "$ref": "#/definitions/mediaSingle_caption_node"
 *       },
 *       {
 *         "$ref": "#/definitions/mediaSingle_full_node"
 *       },
 *       {
 *         "$ref": "#/definitions/mediaGroup_node"
 *       },
 *       {
 *         "$ref": "#/definitions/decisionList_node"
 *       },
 *       {
 *         "$ref": "#/definitions/taskList_node"
 *       },
 *       {
 *         "$ref": "#/definitions/blockCard_node"
 *       },
 *       {
 *         "$ref": "#/definitions/embedCard_node"
 *       },
 *       {
 *         "$ref": "#/definitions/extension_with_marks_node"
 *       },
 *       {
 *         "$ref": "#/definitions/nestedExpand_with_no_marks_node"
 *       }
 *     ]
 *   },
 *   "minItems": 1
 * }
 * </pre>
 *
 * @see T.TableCellContentType
 */
export const TableCellContentSchema: z.ZodType<T.TableCellContentType> = z
  .array(
    z.union([
      ParagraphWithNoMarksNodeSchema,
      ParagraphWithAlignmentNodeSchema,
      PanelNodeSchema,
      BlockquoteNodeSchema,
      OrderedListNodeSchema,
      BulletListNodeSchema,
      RuleNodeSchema,
      HeadingWithNoMarksNodeSchema,
      HeadingWithAlignmentNodeSchema,
      HeadingWithIndentationNodeSchema,
      CodeBlockNodeSchema,
      MediaSingleCaptionNodeSchema,
      MediaSingleFullNodeSchema,
      MediaGroupNodeSchema,
      DecisionListNodeSchema,
      TaskListNodeSchema,
      BlockCardNodeSchema,
      EmbedCardNodeSchema,
      ExtensionWithMarksNodeSchema,
      NestedExpandWithNoMarksNodeSchema,
    ]),
  )
  .min(1);

/**
 * Definition: <code>table_cell_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "tableCell"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "colspan": {
 *           "type": "number"
 *         },
 *         "rowspan": {
 *           "type": "number"
 *         },
 *         "colwidth": {
 *           "type": "array",
 *           "items": {
 *             "type": "number"
 *           }
 *         },
 *         "background": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "$ref": "#/definitions/table_cell_content"
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.TableCellNodeType
 */
export const TableCellNodeSchema: z.ZodType<T.TableCellNodeType> =
  z.strictObject({
    type: z.literal("tableCell"),
    attrs: z
      .strictObject({
        colspan: z.number().optional(),
        rowspan: z.number().optional(),
        colwidth: z.array(z.number()).optional(),
        background: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: TableCellContentSchema,
  });

/**
 * Definition: <code>table_header_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "tableHeader"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "colspan": {
 *           "type": "number"
 *         },
 *         "rowspan": {
 *           "type": "number"
 *         },
 *         "colwidth": {
 *           "type": "array",
 *           "items": {
 *             "type": "number"
 *           }
 *         },
 *         "background": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "$ref": "#/definitions/table_cell_content"
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.TableHeaderNodeType
 */
export const TableHeaderNodeSchema: z.ZodType<T.TableHeaderNodeType> =
  z.strictObject({
    type: z.literal("tableHeader"),
    attrs: z
      .strictObject({
        colspan: z.number().optional(),
        rowspan: z.number().optional(),
        colwidth: z.array(z.number()).optional(),
        background: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: TableCellContentSchema,
  });

/**
 * Definition: <code>table_row_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "tableRow"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "anyOf": [
 *           {
 *             "$ref": "#/definitions/table_cell_node"
 *           },
 *           {
 *             "$ref": "#/definitions/table_header_node"
 *           }
 *         ]
 *       }
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.TableRowNodeType
 */
export const TableRowNodeSchema: z.ZodType<T.TableRowNodeType> = z.strictObject(
  {
    type: z.literal("tableRow"),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(z.union([TableCellNodeSchema, TableHeaderNodeSchema])),
  },
);

/**
 * Definition: <code>table_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "table"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/fragment_mark"
 *       }
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "displayMode": {
 *           "enum": [
 *             "default",
 *             "fixed"
 *           ]
 *         },
 *         "isNumberColumnEnabled": {
 *           "type": "boolean"
 *         },
 *         "layout": {
 *           "enum": [
 *             "wide",
 *             "full-width",
 *             "center",
 *             "align-end",
 *             "align-start",
 *             "default"
 *           ]
 *         },
 *         "localId": {
 *           "type": "string",
 *           "minLength": 1
 *         },
 *         "width": {
 *           "type": "number"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/table_row_node"
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.TableNodeType
 */
export const TableNodeSchema: z.ZodType<T.TableNodeType> = z.strictObject({
  type: z.literal("table"),
  marks: z.array(FragmentMarkSchema).optional(),
  attrs: z
    .strictObject({
      displayMode: z
        .union([z.literal("default"), z.literal("fixed")])
        .optional(),
      isNumberColumnEnabled: z.boolean().optional(),
      layout: z
        .union([
          z.literal("wide"),
          z.literal("full-width"),
          z.literal("center"),
          z.literal("align-end"),
          z.literal("align-start"),
          z.literal("default"),
        ])
        .optional(),
      localId: z.string().min(1).optional(),
      width: z.number().optional(),
    })
    .optional(),
  content: z.array(TableRowNodeSchema).min(1),
});

/**
 * Definition: <code>non_nestable_block_content</code>
 *
 * <pre>
 * {
 *   "anyOf": [
 *     {
 *       "$ref": "#/definitions/paragraph_with_no_marks_node"
 *     },
 *     {
 *       "$ref": "#/definitions/panel_node"
 *     },
 *     {
 *       "$ref": "#/definitions/blockquote_node"
 *     },
 *     {
 *       "$ref": "#/definitions/orderedList_node"
 *     },
 *     {
 *       "$ref": "#/definitions/bulletList_node"
 *     },
 *     {
 *       "$ref": "#/definitions/rule_node"
 *     },
 *     {
 *       "$ref": "#/definitions/heading_with_no_marks_node"
 *     },
 *     {
 *       "$ref": "#/definitions/codeBlock_node"
 *     },
 *     {
 *       "$ref": "#/definitions/mediaGroup_node"
 *     },
 *     {
 *       "$ref": "#/definitions/mediaSingle_caption_node"
 *     },
 *     {
 *       "$ref": "#/definitions/mediaSingle_full_node"
 *     },
 *     {
 *       "$ref": "#/definitions/decisionList_node"
 *     },
 *     {
 *       "$ref": "#/definitions/taskList_node"
 *     },
 *     {
 *       "$ref": "#/definitions/table_node"
 *     },
 *     {
 *       "$ref": "#/definitions/blockCard_node"
 *     },
 *     {
 *       "$ref": "#/definitions/embedCard_node"
 *     },
 *     {
 *       "$ref": "#/definitions/extension_with_marks_node"
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.NonNestableBlockContentType
 */
export const NonNestableBlockContentSchema: z.ZodType<T.NonNestableBlockContentType> =
  z.union([
    ParagraphWithNoMarksNodeSchema,
    PanelNodeSchema,
    BlockquoteNodeSchema,
    OrderedListNodeSchema,
    BulletListNodeSchema,
    RuleNodeSchema,
    HeadingWithNoMarksNodeSchema,
    CodeBlockNodeSchema,
    MediaGroupNodeSchema,
    MediaSingleCaptionNodeSchema,
    MediaSingleFullNodeSchema,
    DecisionListNodeSchema,
    TaskListNodeSchema,
    TableNodeSchema,
    BlockCardNodeSchema,
    EmbedCardNodeSchema,
    ExtensionWithMarksNodeSchema,
  ]);

/**
 * Definition: <code>expand_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "expand"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array",
 *       "maxItems": 0
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "title": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "anyOf": [
 *           {
 *             "$ref": "#/definitions/non_nestable_block_content"
 *           },
 *           {
 *             "$ref": "#/definitions/nestedExpand_with_no_marks_node"
 *           }
 *         ]
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.ExpandNodeType
 */
export const ExpandNodeSchema: z.ZodType<T.ExpandNodeType> = z.strictObject({
  type: z.literal("expand"),
  marks: z.array(z.unknown()).optional(),
  attrs: z
    .strictObject({
      title: z.string().optional(),
      localId: z.string().optional(),
    })
    .optional(),
  content: z
    .array(
      z.union([
        NonNestableBlockContentSchema,
        NestedExpandWithNoMarksNodeSchema,
      ]),
    )
    .min(1),
});

/**
 * Definition: <code>bodiedExtension_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "bodiedExtension"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array"
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "extensionKey": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "extensionType": {
 *           "minLength": 1,
 *           "type": "string"
 *         },
 *         "parameters": {},
 *         "text": {
 *           "type": "string"
 *         },
 *         "layout": {
 *           "enum": [
 *             "wide",
 *             "full-width",
 *             "default"
 *           ]
 *         },
 *         "localId": {
 *           "minLength": 1,
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "extensionKey",
 *         "extensionType"
 *       ],
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/non_nestable_block_content"
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.BodiedExtensionNodeType
 */
export const BodiedExtensionNodeSchema: z.ZodType<T.BodiedExtensionNodeType> =
  z.strictObject({
    type: z.literal("bodiedExtension"),
    marks: z.array(z.unknown()).optional(),
    attrs: z.strictObject({
      extensionKey: z.string().min(1),
      extensionType: z.string().min(1),
      parameters: z.unknown().optional(),
      text: z.string().optional(),
      layout: z
        .union([
          z.literal("wide"),
          z.literal("full-width"),
          z.literal("default"),
        ])
        .optional(),
      localId: z.string().min(1).optional(),
    }),
    content: z.array(NonNestableBlockContentSchema).min(1),
  });

/**
 * Definition: <code>bodiedExtension_with_marks_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/bodiedExtension_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "anyOf": [
 *               {
 *                 "$ref": "#/definitions/dataConsumer_mark"
 *               },
 *               {
 *                 "$ref": "#/definitions/fragment_mark"
 *               }
 *             ]
 *           }
 *         }
 *       },
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.BodiedExtensionWithMarksNodeType
 */
export const BodiedExtensionWithMarksNodeSchema: z.ZodType<T.BodiedExtensionWithMarksNodeType> =
  z.intersection(
    BodiedExtensionNodeSchema,
    z.object({
      marks: z
        .array(z.union([DataConsumerMarkSchema, FragmentMarkSchema]))
        .optional(),
    }),
  );

/**
 * Definition: <code>block_content</code>
 *
 * <pre>
 * {
 *   "anyOf": [
 *     {
 *       "$ref": "#/definitions/blockCard_node"
 *     },
 *     {
 *       "$ref": "#/definitions/paragraph_with_no_marks_node"
 *     },
 *     {
 *       "$ref": "#/definitions/paragraph_with_alignment_node"
 *     },
 *     {
 *       "$ref": "#/definitions/paragraph_with_indentation_node"
 *     },
 *     {
 *       "$ref": "#/definitions/mediaSingle_caption_node"
 *     },
 *     {
 *       "$ref": "#/definitions/mediaSingle_full_node"
 *     },
 *     {
 *       "$ref": "#/definitions/codeBlock_node"
 *     },
 *     {
 *       "$ref": "#/definitions/taskList_node"
 *     },
 *     {
 *       "$ref": "#/definitions/bulletList_node"
 *     },
 *     {
 *       "$ref": "#/definitions/orderedList_node"
 *     },
 *     {
 *       "$ref": "#/definitions/heading_with_no_marks_node"
 *     },
 *     {
 *       "$ref": "#/definitions/heading_with_alignment_node"
 *     },
 *     {
 *       "$ref": "#/definitions/heading_with_indentation_node"
 *     },
 *     {
 *       "$ref": "#/definitions/mediaGroup_node"
 *     },
 *     {
 *       "$ref": "#/definitions/decisionList_node"
 *     },
 *     {
 *       "$ref": "#/definitions/rule_node"
 *     },
 *     {
 *       "$ref": "#/definitions/panel_node"
 *     },
 *     {
 *       "$ref": "#/definitions/blockquote_node"
 *     },
 *     {
 *       "$ref": "#/definitions/extension_with_marks_node"
 *     },
 *     {
 *       "$ref": "#/definitions/embedCard_node"
 *     },
 *     {
 *       "$ref": "#/definitions/table_node"
 *     },
 *     {
 *       "$ref": "#/definitions/expand_node"
 *     },
 *     {
 *       "$ref": "#/definitions/bodiedExtension_with_marks_node"
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.BlockContentType
 */
export const BlockContentSchema: z.ZodType<T.BlockContentType> = z.union([
  BlockCardNodeSchema,
  ParagraphWithNoMarksNodeSchema,
  ParagraphWithAlignmentNodeSchema,
  ParagraphWithIndentationNodeSchema,
  MediaSingleCaptionNodeSchema,
  MediaSingleFullNodeSchema,
  CodeBlockNodeSchema,
  TaskListNodeSchema,
  BulletListNodeSchema,
  OrderedListNodeSchema,
  HeadingWithNoMarksNodeSchema,
  HeadingWithAlignmentNodeSchema,
  HeadingWithIndentationNodeSchema,
  MediaGroupNodeSchema,
  DecisionListNodeSchema,
  RuleNodeSchema,
  PanelNodeSchema,
  BlockquoteNodeSchema,
  ExtensionWithMarksNodeSchema,
  EmbedCardNodeSchema,
  TableNodeSchema,
  ExpandNodeSchema,
  BodiedExtensionWithMarksNodeSchema,
]);

/**
 * Definition: <code>breakout_mark</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "breakout"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "mode": {
 *           "enum": [
 *             "wide",
 *             "full-width"
 *           ]
 *         },
 *         "width": {
 *           "type": "number"
 *         }
 *       },
 *       "required": [
 *         "mode"
 *       ],
 *       "additionalProperties": false
 *     }
 *   },
 *   "required": [
 *     "type",
 *     "attrs"
 *   ],
 *   "additionalProperties": false
 * }
 * </pre>
 *
 * @see T.BreakoutMarkType
 */
export const BreakoutMarkSchema: z.ZodType<T.BreakoutMarkType> = z.strictObject(
  {
    type: z.literal("breakout"),
    attrs: z.strictObject({
      mode: z.union([z.literal("wide"), z.literal("full-width")]),
      width: z.number().optional(),
    }),
  },
);

/**
 * Definition: <code>codeBlock_root_only_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "codeBlock"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/breakout_mark"
 *       }
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "language": {
 *           "type": "string"
 *         },
 *         "uniqueId": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/text_with_no_marks_node"
 *       }
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type"
 *   ]
 * }
 * </pre>
 *
 * @see T.CodeBlockRootOnlyNodeType
 */
export const CodeBlockRootOnlyNodeSchema: z.ZodType<T.CodeBlockRootOnlyNodeType> =
  z.strictObject({
    type: z.literal("codeBlock"),
    marks: z.array(BreakoutMarkSchema).optional(),
    attrs: z
      .strictObject({
        language: z.string().optional(),
        uniqueId: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z.array(TextWithNoMarksNodeSchema).optional(),
  });

/**
 * Definition: <code>layoutColumn_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "layoutColumn"
 *       ]
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "width": {
 *           "type": "number",
 *           "minimum": 0,
 *           "maximum": 100
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "required": [
 *         "width"
 *       ],
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/block_content"
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "attrs",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.LayoutColumnNodeType
 */
export const LayoutColumnNodeSchema: z.ZodType<T.LayoutColumnNodeType> =
  z.strictObject({
    type: z.literal("layoutColumn"),
    attrs: z.strictObject({
      width: z.number().max(100),
      localId: z.string().optional(),
    }),
    content: z.array(BlockContentSchema).min(1),
  });

/**
 * Definition: <code>layoutSection_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "layoutSection"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/breakout_mark"
 *       }
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/layoutColumn_node"
 *       }
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.LayoutSectionNodeType
 */
export const LayoutSectionNodeSchema: z.ZodType<T.LayoutSectionNodeType> =
  z.strictObject({
    type: z.literal("layoutSection"),
    marks: z.array(BreakoutMarkSchema).optional(),
    attrs: z.strictObject({ localId: z.string().optional() }).optional(),
    content: z.array(LayoutColumnNodeSchema),
  });

/**
 * Definition: <code>layoutSection_full_node</code>
 *
 * <pre>
 * {
 *   "allOf": [
 *     {
 *       "$ref": "#/definitions/layoutSection_node"
 *     },
 *     {
 *       "type": "object",
 *       "properties": {
 *         "marks": {
 *           "type": "array",
 *           "items": {
 *             "$ref": "#/definitions/breakout_mark"
 *           }
 *         },
 *         "content": {
 *           "type": "array",
 *           "items": {
 *             "$ref": "#/definitions/layoutColumn_node"
 *           },
 *           "minItems": 2,
 *           "maxItems": 3
 *         }
 *       },
 *       "required": [
 *         "content"
 *       ],
 *       "additionalProperties": true
 *     }
 *   ]
 * }
 * </pre>
 *
 * @see T.LayoutSectionFullNodeType
 */
export const LayoutSectionFullNodeSchema: z.ZodType<T.LayoutSectionFullNodeType> =
  z.intersection(
    LayoutSectionNodeSchema,
    z.object({
      marks: z.array(BreakoutMarkSchema).optional(),
      content: z.array(LayoutColumnNodeSchema).min(2).max(3),
    }),
  );

/**
 * Definition: <code>expand_root_only_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "expand"
 *       ]
 *     },
 *     "marks": {
 *       "type": "array",
 *       "items": {
 *         "$ref": "#/definitions/breakout_mark"
 *       }
 *     },
 *     "attrs": {
 *       "type": "object",
 *       "properties": {
 *         "title": {
 *           "type": "string"
 *         },
 *         "localId": {
 *           "type": "string"
 *         }
 *       },
 *       "additionalProperties": false
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "anyOf": [
 *           {
 *             "$ref": "#/definitions/non_nestable_block_content"
 *           },
 *           {
 *             "$ref": "#/definitions/nestedExpand_with_no_marks_node"
 *           }
 *         ]
 *       },
 *       "minItems": 1
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.ExpandRootOnlyNodeType
 */
export const ExpandRootOnlyNodeSchema: z.ZodType<T.ExpandRootOnlyNodeType> =
  z.strictObject({
    type: z.literal("expand"),
    marks: z.array(BreakoutMarkSchema).optional(),
    attrs: z
      .strictObject({
        title: z.string().optional(),
        localId: z.string().optional(),
      })
      .optional(),
    content: z
      .array(
        z.union([
          NonNestableBlockContentSchema,
          NestedExpandWithNoMarksNodeSchema,
        ]),
      )
      .min(1),
  });

/**
 * Definition: <code>doc_node</code>
 *
 * <pre>
 * {
 *   "type": "object",
 *   "properties": {
 *     "type": {
 *       "enum": [
 *         "doc"
 *       ]
 *     },
 *     "content": {
 *       "type": "array",
 *       "items": {
 *         "anyOf": [
 *           {
 *             "$ref": "#/definitions/blockCard_node"
 *           },
 *           {
 *             "$ref": "#/definitions/codeBlock_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mediaSingle_caption_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mediaSingle_full_node"
 *           },
 *           {
 *             "$ref": "#/definitions/paragraph_with_alignment_node"
 *           },
 *           {
 *             "$ref": "#/definitions/paragraph_with_indentation_node"
 *           },
 *           {
 *             "$ref": "#/definitions/paragraph_with_no_marks_node"
 *           },
 *           {
 *             "$ref": "#/definitions/taskList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/orderedList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/bulletList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/blockquote_node"
 *           },
 *           {
 *             "$ref": "#/definitions/decisionList_node"
 *           },
 *           {
 *             "$ref": "#/definitions/embedCard_node"
 *           },
 *           {
 *             "$ref": "#/definitions/extension_with_marks_node"
 *           },
 *           {
 *             "$ref": "#/definitions/heading_with_indentation_node"
 *           },
 *           {
 *             "$ref": "#/definitions/heading_with_no_marks_node"
 *           },
 *           {
 *             "$ref": "#/definitions/heading_with_alignment_node"
 *           },
 *           {
 *             "$ref": "#/definitions/mediaGroup_node"
 *           },
 *           {
 *             "$ref": "#/definitions/rule_node"
 *           },
 *           {
 *             "$ref": "#/definitions/panel_node"
 *           },
 *           {
 *             "$ref": "#/definitions/table_node"
 *           },
 *           {
 *             "$ref": "#/definitions/bodiedExtension_with_marks_node"
 *           },
 *           {
 *             "$ref": "#/definitions/expand_node"
 *           },
 *           {
 *             "$ref": "#/definitions/codeBlock_root_only_node"
 *           },
 *           {
 *             "$ref": "#/definitions/layoutSection_full_node"
 *           },
 *           {
 *             "$ref": "#/definitions/expand_root_only_node"
 *           }
 *         ]
 *       }
 *     },
 *     "version": {
 *       "enum": [
 *         1
 *       ]
 *     }
 *   },
 *   "additionalProperties": false,
 *   "required": [
 *     "version",
 *     "type",
 *     "content"
 *   ]
 * }
 * </pre>
 *
 * @see T.DocNodeType
 */
export const DocNodeSchema: z.ZodType<T.DocNodeType> = z.strictObject({
  type: z.literal("doc"),
  content: z.array(
    z.union([
      BlockCardNodeSchema,
      CodeBlockNodeSchema,
      MediaSingleCaptionNodeSchema,
      MediaSingleFullNodeSchema,
      ParagraphWithAlignmentNodeSchema,
      ParagraphWithIndentationNodeSchema,
      ParagraphWithNoMarksNodeSchema,
      TaskListNodeSchema,
      OrderedListNodeSchema,
      BulletListNodeSchema,
      BlockquoteNodeSchema,
      DecisionListNodeSchema,
      EmbedCardNodeSchema,
      ExtensionWithMarksNodeSchema,
      HeadingWithIndentationNodeSchema,
      HeadingWithNoMarksNodeSchema,
      HeadingWithAlignmentNodeSchema,
      MediaGroupNodeSchema,
      RuleNodeSchema,
      PanelNodeSchema,
      TableNodeSchema,
      BodiedExtensionWithMarksNodeSchema,
      ExpandNodeSchema,
      CodeBlockRootOnlyNodeSchema,
      LayoutSectionFullNodeSchema,
      ExpandRootOnlyNodeSchema,
    ]),
  ),
  version: z.literal(1),
});
