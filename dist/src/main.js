"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const bodyParser = require("body-parser");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
require("dotenv").config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix("api");
    const options = new swagger_1.DocumentBuilder()
        .setTitle("RAFTING APP")
        .setDescription("Rafting API documentation")
        .setVersion("1.0")
        .addBearerAuth({
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: "Authorization",
        bearerFormat: "Bearer",
        scheme: "Bearer",
        type: "http",
        in: "Header",
    })
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("api", app, document, {
        swaggerOptions: {
            persistAuthorization: true,
        },
    });
    app.enableCors({
        origin: (_, callback) => {
            callback(null, true);
        },
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Origin",
            "X-Requested-With",
            "Content-Type",
            "Accept",
            "Authorization",
        ],
        credentials: true,
        optionsSuccessStatus: 204,
    });
    app.use(bodyParser.json({ limit: "1mb" }));
    app.use(bodyParser.urlencoded({ limit: "1mb", extended: true }));
    app.use(bodyParser.text({ type: "text/html" }));
    app.use((0, helmet_1.default)());
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map