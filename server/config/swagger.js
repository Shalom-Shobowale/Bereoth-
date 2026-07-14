import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",

    info: {
      title: "Real Estate Management API",
      version: "1.0.0",
      description:
        "API documentation for the Real Estate Management backend system",
    },

    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local development server",
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
              example:
                "Beautiful apartment with modern facilities",
            },

            status: {
              type: "string",
              example: "Available",
            },

            type: {
              type: "string",
              example: "Apartment",
            },

            images: {
              type: "array",
              items:{
                type:"string"
              }
            }

          },
        },


        Inquiry:{
          type:"object",
          properties:{
            id:{
              type:"string",
              example:"123"
            },

            name:{
              type:"string",
              example:"Michael"
            },

            email:{
              type:"string",
              example:"michael@gmail.com"
            },

            phone:{
              type:"string",
              example:"+2348000000000"
            },

            message:{
              type:"string",
              example:"I want to inspect this property"
            }
          }
        }

      }
    },

  },

  apis: [
    "./routes/*.js",
  ],
};


export const swaggerSpec = swaggerJsdoc(options);