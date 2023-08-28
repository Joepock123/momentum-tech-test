# Momementum Tech Task

## Acceptability Criteria

- [x] Provided a list of company domains firstly check to see if the URL `https://${COMPANY_NAME}.zendesk.com` returns a 200 status code.
- [x] Secondly, using a cname lookup, check to see if a support or help domain points to a domain ending in .zendesk.com.
- [x] Provide a response that provides the login and support pages login URLs for each domain.

## Testing
### Send a request
The server is deployed at https://momentum-tech-test.onrender.com. Below is an example of the endpoint and body.

```
curl -X POST "https://momentum-tech-test.onrender.com/zendesk/pages" \
     -H "Content-Type: application/json" \
     -d '{
           "domains": [
             "mediatemple.net",
             "myspace.com",
             "laseraway.com"
           ]
         }'
```

### Response

```
type TResponse = IPages[]
interface IPages {
  search: string; // The domain name that was searched
  loginPage: string[]; // The login page for the domain
  supportPage: string[]; // The support page for the domain
}
```

## Approach
- I prioritised simplicity and development speed.
- `express-validator` is used for basic validation of the request.
- I used the neat `dns` package instead of the MXToolbox API to do the cname lookup. 
- The response is structured to be easily parsed by the client.
- The server is deployed using Render which is 10x nicer to use than Heroku.

## Next steps
- Enhanced validation middleware to check the domains are in the correct format.
- Check for zendesk clues by inspecting the headers, HTML content, or cookies.

---

## Introduction

An important data point for many of the companies we work with is are they currently using a competitor.

One of the companies more specifically wants to know is a company using Zendesk or not.

The best way we’ve found so far to do this is domain crawling. We find 2 key points:

---

1: Does the company have a Zendesk login page?

A compony login page is structured in the following way https://{COMPANY_NAME/BASEDOMAIN}.zendesk.com

An example would be https://www.laseraway.com has a Zendesk login of: https://laseraway.zendesk.com

If the url returns 200 then we accept that the company has a login page

2: Does the company have a support page that points to a Zendesk host page?

For the purpose of the exercise assume that the main support pages are structured as support.basedomain.com or help.basedomain.com

The way we check for Zendesk is with a cname look up, if the cname points to a domain ending in .zendesk.com that means they are using Zendesk for their support page.

For example mediatemplate.net has a support page support.mediatemple.net that points to the following cname: mtcloudsupport.zendesk.com, meaning they are hosting their support page on Zendesk. MXToolBox is a great way to check a domain before testing:

![mxtoolbox](shot.png)

---

In reality we combine this with a few other methods as these are not 100% accurate but they provide a good indicator.

For the task we would like you to build an api that ingests a list of company domains and returns a response that returns the companies Zendesk login page url and the companies Zendesk support page url if they are a successful match.

We have provided a base Express + Typescript app. As well as a list of sample companies that we know have Zendesk to test with.
