# classify-number
API that takes a number and returns an interesting mathematical properties about it, along with a fun fact.

## Resources

- Fun fact API:
    http://numbersapi.com/#42

- https://en.wikipedia.org/wiki/Parity_(mathematics)

## Criteria and spec

- [ ] must handle CORS
- [ ] Accepts `GET` requests with a number parameter.
- [ ] Accepts all valid integers as the only possible inputs.
- [ ] **Endpoint**: `GET** /api/classify-number?number=371`
- [ ] **Returned JSON Response Format (200 OK)**:
  ```json
  {
      "number": 371,
      "is_prime": false,
      "is_perfect": false,
      "properties": ["armstrong", "odd"],
      "digit_sum": 11,  // sum of its digits
      "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371" // gotten from the numbers API
  }
  ```
- [ ] **JSON error Response Format (400 Bad Request):**
  ```
  {
    "number": "alphabet",
    "error": true
  }
  ```

## Docker Instructions

### Clone the repository
```sh
git clone https://github.com/Phastboy/classify-number.git
cd classify-number
```

### Build the Docker image
```sh
docker build -t classify-number .
```

### Run the Docker container
```sh
docker run -p 3000:3000 classify-number
```

### Use docker-compose
```sh
docker-compose up
```

## Swagger API Documentation

The API documentation is available via Swagger. To access the Swagger UI, follow these steps:

1. Start the application using one of the Docker instructions above.
2. Open your web browser and navigate to `http://localhost:3000`.

You will see the Swagger UI, which provides detailed information about the API endpoints, request parameters, and response formats.
