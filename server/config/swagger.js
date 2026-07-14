import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Bereoth Real Estate API",
      version: "1.0.0",
      description:
        "API documentation for Bereoth real estate management platform.",
      contact: {
        name: "Bereoth Development Team",
        email: "support@bereoth.com",
      },
    },

    servers: [
      {
        url: "https://api.bereoth.com/api",
        description: "Production server",
      },
      //   {
      //     url: "http://localhost:5000/api",
      //     description: "Local development server",
      //   },
    ],

    tags: [
      {
        name: "Authentication",
        description: "User authentication endpoints",
      },
      {
        name: "Properties",
        description: "Property management endpoints",
      },
      {
        name: "Inquiries",
        description: "Customer inquiry endpoints",
      },
      {
        name: "Users",
        description: "Admin user management endpoints",
      },
      {
        name: "Dashboard",
        description: "Dashboard analytics endpoints",
      },
      {
        name: "Upload",
        description: "Property image upload endpoints",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },

      schemas: {
        User: {
          type: "object",
          required: ["id", "name", "email", "role"],
          properties: {
            id: {
              type: "string",
              example: "a1b2c3",
            },
            name: {
              type: "string",
              example: "John Doe",
            },
            email: {
              type: "string",
              example: "john@example.com",
            },
            role: {
              type: "string",
              example: "admin",
            },
          },
        },

        Property: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "property-id",
            },

            title: {
              type: "string",
              example: "Luxury 4 Bedroom Apartment",
            },

            price: {
              type: "number",
              example: 250000,
            },

            location: {
              type: "string",
              example: "Lekki Phase 1 Lagos",
            },

            description: {
              type: "string",
              example: "Beautiful apartment with modern facilities",
            },

            status: {
              type: "string",
              example: "Available",
            },

            type: {
              type: "string",
              example: "Apartment",
            },

            size: {
              type: "string",
              example: "250 sqm",
            },

            features: {
              type: "array",
              items: {
                type: "string",
              },
              example: ["Swimming Pool", "Parking", "Security"],
            },

            amenities: {
              type: "array",
              items: {
                type: "string",
              },
            },

            images: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },

        Inquiry: {
          type: "object",
          properties: {
            id: {
              type: "string",
              example: "123",
            },

            name: {
              type: "string",
              example: "Michael",
            },

            email: {
              type: "string",
              example: "michael@gmail.com",
            },

            phone: {
              type: "string",
              example: "+2348000000000",
            },

            message: {
              type: "string",
              example: "I want to inspect this property",
            },
          },
        },

        UploadResponse: {
          type: "object",
          properties: {
            imageUrl: {
              type: "string",
              example: "https://xyz.supabase.co/storage/property-image.jpg",
            },
          },
        },
      },
    },
  },

  apis: ["./routes/*.js"],
};

export const swaggerSpec = swaggerJsdoc(options);
