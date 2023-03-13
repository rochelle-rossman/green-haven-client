
# Green Haven Client

This is the frontend component of a full-stack e-commerce application, focused on houseplants and design. The goal was to create an application that could inform and inspire cutomers who are looking for houseplants that they could successfully care for and enhance their homes interior aesthetic. 

## Overview
This client-side application was built using React/Next.js, uses Firebase for authetication with Google, and communicates with a server-side application built with Python and Django. The server repository can be found here: https://github.com/rochelle-rossman/green-haven-server. Together, the client and server-side applications allow users to:

- Browse and search products, filtering with pertinent queries.
- View images of inspirational interiors that feature the various products, and easily navigate to the featured products details where they can add the item to their cart.
- Create an account, store their billing information, and view their order history
- Update the quantity of a product or delete items in their order in their shopping cart view. 
- Select a stored form of payment and checkout.
## Screenshots

[![Screenshot-2023-03-13-at-10-27-23-AM.png](https://i.postimg.cc/ZKS0y18F/Screenshot-2023-03-13-at-10-27-23-AM.png)](https://postimg.cc/qg1pPDZz)

[![Screenshot-2023-03-13-at-10-28-14-AM.png](https://i.postimg.cc/c4BC7XTq/Screenshot-2023-03-13-at-10-28-14-AM.png)](https://postimg.cc/qzgp4c9Q)

[![Screenshot-2023-03-13-at-10-28-33-AM.png](https://i.postimg.cc/q7SvBYBK/Screenshot-2023-03-13-at-10-28-33-AM.png)](https://postimg.cc/xkG2t6zj)

[![Screenshot-2023-03-13-at-10-28-50-AM.png](https://i.postimg.cc/DZGySgmM/Screenshot-2023-03-13-at-10-28-50-AM.png)](https://postimg.cc/2bzfJnQQ)

[![Screenshot-2023-03-13-at-10-29-21-AM.png](https://i.postimg.cc/pdpdHxvx/Screenshot-2023-03-13-at-10-29-21-AM.png)](https://postimg.cc/QBZDQ2Vn)

[![Screenshot-2023-03-13-at-10-29-53-AM.png](https://i.postimg.cc/Gm32XGS4/Screenshot-2023-03-13-at-10-29-53-AM.png)](https://postimg.cc/SJ5ks244)

[![Screenshot-2023-03-13-at-10-31-33-AM.png](https://i.postimg.cc/Vk7Npv3D/Screenshot-2023-03-13-at-10-31-33-AM.png)](https://postimg.cc/68vwGW6v)
## ERD
https://drawsql.app/teams/rochelle-rossman/diagrams/green-haven
[![draw-SQL-green-haven-export-2023-03-13.png](https://i.postimg.cc/MKF4L891/draw-SQL-green-haven-export-2023-03-13.png)](https://postimg.cc/VdXDS2QN)
## Wireframe
https://miro.com/app/board/uXjVPqtXsKY=/?share_link_id=554081059619
## Run Locally
#### First:
#### - Create a Firebase project and enable authentication through Google
#### - Clone the server-side repository and make migrations

#### Then:

Clone the repository

```bash
  git clone git@github.com:rochelle-rossman/green-haven-client.git
```

Go to the project directory

```bash
  cd green-haven-client
```

Install dependencies in the root directory

```bash
  npm install
```
```bash
  npm run prepare
```
Create an env file and copy over the required variables
```bash
NEXT_PUBLIC_FIREBASE_API_KEY=""
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=""
NEXT_PUBLIC_DATABASE_URL=http://localhost:8000 
```

Start the server

```bash
  npm run dev
```
