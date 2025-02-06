# Security Policy

## Supported Versions

The following table outlines the versions of Pet Care that are currently receiving security updates:

| Version | Supported          | Notes |
| ------- | ------------------ | ----- |
| 1.x.x   | :white_check_mark: | Latest stable release series |
| 0.x.x   | :x:               | Beta releases - use at your own risk |

We strongly recommend using the latest version of Pet Care to ensure you have all security patches and feature updates.

## Security Features

Pet Care implements several security measures to protect your data:

- **Authentication**: Secure user authentication through [Clerk](https://clerk.com)
- **Database Security**: Row-level security (RLS) policies in Supabase
- **API Security**: 
  - Rate limiting to prevent abuse
  - Input validation and sanitization
  - CORS protection
- **Data Protection**:
  - Encrypted data at rest and in transit
  - Regular backups
  - Secure password hashing
- **Frontend Security**:
  - XSS protection
  - CSRF prevention
  - Content Security Policy (CSP)

## Best Practices

When using Pet Care Landing, follow these security best practices:

1. Keep your dependencies up to date
2. Use strong passwords
3. Enable two-factor authentication when available
4. Regularly review access logs
5. Follow the principle of least privilege
6. Keep your API keys secure and never commit them to version control

## Reporting a Vulnerability

We take security vulnerabilities seriously. If you discover a security issue, please follow these steps:

1. **Do Not** disclose the vulnerability publicly until it has been addressed.
2. Email us at [security@petcarelanding.com](mailto:security@petcarelanding.com) with:
   - A description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Initial Response**: Within 48 hours
- **Status Update**: Every 72 hours until resolution
- **Resolution Timeline**: Typically within 1-2 weeks, depending on severity

### Bug Bounty Program

We currently do not offer a bug bounty program, but we deeply appreciate responsible disclosure of security vulnerabilities.

## Security Updates

- Security updates are released as soon as possible after a vulnerability is confirmed
- Updates are distributed through our standard release channels
- Critical updates are announced through our security mailing list

To stay informed about security updates:
1. Watch our GitHub repository
2. Subscribe to our security mailing list
3. Follow our Twitter account [@PetCareLanding](https://twitter.com/PetCareLanding)

## Contact

For security-related questions or concerns:
- Email: security@petcarelanding.com
- PGP Key: [Download PGP Key](https://petcarelanding.com/security/pgp-key.asc)

## Acknowledgments

We maintain a [Hall of Fame](https://petcarelanding.com/security/hall-of-fame) to recognize security researchers who have responsibly disclosed vulnerabilities.
