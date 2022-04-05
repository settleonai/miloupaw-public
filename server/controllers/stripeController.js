const businessProfileModel = require("../../models/businessProfileModel");

const stripe = require("stripe")(process.env.STRIPE_API_KEY);

// @desc    Stripe webhooks
// @route   POST /stripe/
// @access  Public
exports.stripeGeneralHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  console.log("req.headers", req.headers["stripe-signature"]);

  let event, paymentIntent;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.WHS);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case "payment_intent.amount_capturable_updated":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.amount_capturable_updated
      console.log(
        `✅ payment_intent.amount_capturable_updated ${paymentIntent}`
      );
      break;
    case "payment_intent.canceled":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.canceled
      console.log(`✅ payment_intent.canceled ${paymentIntent}`);
      break;
    case "payment_intent.created":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.created
      console.log(`✅ payment_intent.created ${paymentIntent}`);
      break;
    case "payment_intent.payment_failed":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.payment_failed
      console.log(`✅ payment_intent.payment_failed ${paymentIntent}`);
      break;
    case "payment_intent.processing":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.processing
      console.log(`✅ payment_intent.processing ${paymentIntent}`);
      break;
    case "payment_intent.requires_action":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.requires_action
      console.log(`✅ payment_intent.requires_action ${paymentIntent}`);
      break;
    case "payment_intent.succeeded":
      paymentIntent = event.data.object;
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log(`✅ payment_intent.succeeded ${paymentIntent}`);
      break;
    case "charge.succeeded":
      charge = event.data.object;
      await updateAppointment(charge, event.created);
      // Then define and call a function to handle the event payment_intent.succeeded
      console.log(`✅ payment_intent.succeeded ${charge}`);
      break;
    // .. handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send();
};

// @desc    Stripe Connect webhooks
// @route   POST /stripe/connect/
// @access  Public
exports.stripeConnectHook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.WHS);
  } catch (err) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Successfully constructed event
  // Handle the event
  switch (event.type) {
    case "account.updated":
      // Then define and call a function to handle the event account.updated
      await updateStylist(event.data);
      console.log(`✅ account.updated: ${event.object.id}`);
      break;
    case "account.application.authorized":
      // Then define and call a function to handle the event account.application.authorized
      console.log(`✅ account.application.authorized: ${event.object.id}`);

      break;
    case "account.application.deauthorized":
      const businessModel = await businessProfileModel.findOne({
        "stripe.id": event.object.id,
      });
      businessModel.stripe.id = "";
      businessModel.stripe.business_type = "";
      businessModel.stripe.created = "";
      businessModel.stripe.external_account = "";
      businessModel.stripe.login_links = "";
      businessModel.stripe.charges_enabled = false;
      businessModel.stripe.capabilities.transfers = "";
      businessModel.stripe.capabilities.card_payments = "";

      await businessModel.save();
      // Then define and call a function to handle the event account.application.deauthorized
      console.log(`✅ account.application.deauthorized: ${event.object.id}`);

      break;
    case "account.external_account.created":
      // Then define and call a function to handle the event account.external_account.created
      console.log(`✅ account.external_account.created: ${event.object.id}`);

      break;
    case "account.external_account.deleted":
      // Then define and call a function to handle the event account.external_account.deleted
      console.log(`✅ account.external_account.deleted: ${event.object.id}`);

      break;
    case "account.external_account.updated":
      // Then define and call a function to handle the event account.external_account.updated
      console.log(`✅ account.external_account.updated: ${event.object.id}`);

      break;
    // .. handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  res.json({ received: true });
};

async function updateAppointment(data, created) {
  console.log("updateAppointment", data, created);
  try {
    const {
      metadata: { appointment },
      id,
      receipt_url,
    } = data;
    let charge = { id, created: created * 1000 };
    appointment = await AppointmentModel.findById(appointment).select(
      "+payment.charge"
    );
    if (!appointment) {
      return;
    }

    appointment.status = "PAID";
    appointment.payment.status = "received";
    appointment.payment.receiptUrl = receipt_url;
    appointment.payment.charge = charge;
    await appointment.save();

    console.log("appointment", appointment);

    // mail to stylist
    // const stylist = [
    //   [appointment.stylist.email, appointment.stylist.first_name],
    // ];
    // const tags = {
    //   first_name: appointment.stylist.first_name,
    //   client_first_name: appointment.client.first_name,
    //   appointment_type: appointment.type,
    //   appointment_url: `${baseUrl}/appointments/${appointment._id}`,
    // };
    // await axios.post(
    //   `${baseUrl}/api/mail/send`,
    //   {
    //     to: stylist,
    //     template: "appointment-request-received",
    //     tags,
    //     personalizedSubject: "you just received a new appointment request",
    //   },
    //   {
    //     headers: {
    //       secret: process.env.MAIL_SECRET,
    //     },
    //   }
    // );
  } catch (error) {
    console.log("updateAppointment || error", error);
  }
}
