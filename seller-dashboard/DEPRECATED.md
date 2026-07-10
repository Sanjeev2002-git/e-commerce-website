# Deprecated

This standalone app is no longer used. Admin, seller, and delivery access has
been merged into `web-app` as role-gated routes reachable from the single
customer login page:

- Admin dashboard: `web-app/app/admin`
- Seller dashboard: `web-app/app/seller`
- Delivery dashboard: `web-app/app/delivery`

There is one login and one port (the web-app). After signing in, a user with
the `admin`, `seller`, or `delivery` role is redirected automatically to
their dashboard. This folder can be deleted once you've confirmed nothing
else references it.
