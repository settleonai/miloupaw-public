const express = require("express");
const router = express.Router();
const {
  stripeGeneralHook,
  stripeConnectHook,
} = require("../controllers/stripeController");

router.post("/", express.raw({ type: "application/json" }), stripeGeneralHook);
router.post(
  "/connect",
  express.raw({ type: "application/json" }),
  stripeConnectHook
);

module.exports = router;

// catch stripe webhooks
// app.post("/stripe", express.raw({ type: "application/json" }), (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   let event, paymentIntent;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.WHS);
//   } catch (err) {
//     // On error, log and return the error message
//     console.log(`❌ Error message: ${err.message}`);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle the event
//   switch (event.type) {
//     case "payment_intent.amount_capturable_updated":
//       paymentIntent = event.data.object;
//       // Then define and call a function to handle the event payment_intent.amount_capturable_updated
//       console.log(
//         `✅ payment_intent.amount_capturable_updated ${paymentIntent}`
//       );
//       break;
//     case "payment_intent.canceled":
//       paymentIntent = event.data.object;
//       // Then define and call a function to handle the event payment_intent.canceled
//       console.log(`✅ payment_intent.canceled ${paymentIntent}`);
//       break;
//     case "payment_intent.created":
//       paymentIntent = event.data.object;
//       // Then define and call a function to handle the event payment_intent.created
//       console.log(`✅ payment_intent.created ${paymentIntent}`);
//       break;
//     case "payment_intent.payment_failed":
//       paymentIntent = event.data.object;
//       // Then define and call a function to handle the event payment_intent.payment_failed
//       console.log(`✅ payment_intent.payment_failed ${paymentIntent}`);
//       break;
//     case "payment_intent.processing":
//       paymentIntent = event.data.object;
//       // Then define and call a function to handle the event payment_intent.processing
//       console.log(`✅ payment_intent.processing ${paymentIntent}`);
//       break;
//     case "payment_intent.requires_action":
//       paymentIntent = event.data.object;
//       // Then define and call a function to handle the event payment_intent.requires_action
//       console.log(`✅ payment_intent.requires_action ${paymentIntent}`);
//       break;
//     case "payment_intent.succeeded":
//       paymentIntent = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       console.log(`✅ payment_intent.succeeded ${paymentIntent}`);
//       break;
//     case "charge.succeeded":
//       charge = event.data.object;
//       updateAppointment(charge, event.created);
//       // Then define and call a function to handle the event payment_intent.succeeded
//       console.log(`✅ payment_intent.succeeded ${charge}`);
//       break;
//     // .. handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

//   // Return a response to acknowledge receipt of the event
//   res.json({ received: true });
// });

// catch stripe connect webhooks

// app.post(
//   "/stripe/connect",
//   express.raw({ type: "application/json" }),
//   async (req, res) => {
//     const sig = req.headers["stripe-signature"];

//     let event;

//     try {
//       event = stripe.webhooks.constructEvent(req.body, sig, process.env.WHCS);
//     } catch (err) {
//       // On error, log and return the error message
//       console.log(`❌ Error message: ${err.message}`);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }

//     // Successfully constructed event
//     // Handle the event
//     switch (event.type) {
//       case "account.updated":
//         // Then define and call a function to handle the event account.updated
//         await updateStylist(event.data);
//         console.log(`✅ account.updated: ${event.object.id}`);
//         break;
//       case "account.application.authorized":
//         // Then define and call a function to handle the event account.application.authorized
//         console.log(`✅ account.application.authorized: ${event.object.id}`);

//         break;
//       case "account.application.deauthorized":
//         const businessModel = await StylistBusinessModel.findOne({
//           "stripe.id": event.object.id,
//         });
//         businessModel.stripe.id = "";
//         businessModel.stripe.business_type = "";
//         businessModel.stripe.created = "";
//         businessModel.stripe.external_account = "";
//         businessModel.stripe.login_links = "";
//         businessModel.stripe.charges_enabled = false;
//         businessModel.stripe.capabilities.transfers = "";
//         businessModel.stripe.capabilities.card_payments = "";

//         await businessModel.save();
//         // Then define and call a function to handle the event account.application.deauthorized
//         console.log(`✅ account.application.deauthorized: ${event.object.id}`);

//         break;
//       case "account.external_account.created":
//         // Then define and call a function to handle the event account.external_account.created
//         console.log(`✅ account.external_account.created: ${event.object.id}`);

//         break;
//       case "account.external_account.deleted":
//         // Then define and call a function to handle the event account.external_account.deleted
//         console.log(`✅ account.external_account.deleted: ${event.object.id}`);

//         break;
//       case "account.external_account.updated":
//         // Then define and call a function to handle the event account.external_account.updated
//         console.log(`✅ account.external_account.updated: ${event.object.id}`);

//         break;
//       // .. handle other event types
//       default:
//         console.log(`Unhandled event type ${event.type}`);
//     }

//     // Return a response to acknowledge receipt of the event
//     res.json({ received: true });
//   }
// );
