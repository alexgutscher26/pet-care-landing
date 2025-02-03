# Security Policy

## Supported Versions

Use this section to tell people about which versions of your project are currently being supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| 5.1.x   | :white_check_mark: |
| 5.0.x   | :x:                |
| 4.0.x   | :white_check_mark: |
| < 4.0   | :x:                |

**Note:** It is important to use supported versions to ensure that you receive timely security updates. Unsupported versions may have known vulnerabilities that are not addressed.

## Reporting a Vulnerability

Use this section to tell people how to report a vulnerability.

Tell them where to go, how often they can expect to get an update on a reported vulnerability, what to expect if the vulnerability is accepted or declined, etc.

## Secure Coding Practices

- Validate all inputs to prevent injection attacks.
- Use output encoding to protect against cross-site scripting (XSS).
- Implement proper error handling to avoid leaking sensitive information.

## Dependency Management

- Regularly check for updates to dependencies and apply them promptly.
- Use tools like `npm audit` or `pnpm audit` to identify and fix vulnerabilities in dependencies.

## Incident Response

- Outline the process for responding to security incidents, including how vulnerabilities are prioritized and addressed.

## Security Resources

- [OWASP Top Ten](https://owasp.org/www-project-top-ten/): A list of the top ten most critical web application security risks.
- [Secure Coding Guidelines](https://www.owasp.org/index.php/Secure_Coding_Practices): Best practices for secure coding.
