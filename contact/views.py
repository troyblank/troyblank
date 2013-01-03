from django.shortcuts import render_to_response
from django.template.context import RequestContext
from forms import ContactForm
from django.conf import settings
from django.core.mail import EmailMessage

def contact(request):
	email_sent = False

	if request.method == 'POST':
		contact_form = ContactForm(request.POST)

		if contact_form.is_valid():
			contactData = contact_form.cleaned_data

			#email
			emailBody = '%s \n\n *** DO NOT REPLY TO THIS EMAIL, REPLY TO THE EMAIL BELOW ***\nThis email was sent by %s at the email %s from troyblank.com' % (contactData['message'], contactData['name'], contactData['email'])
			email = EmailMessage('!FROM TROYBLANK.COM!', emailBody, from_email=contactData['email'], to=[settings.CONTACT_EMAIL])
			email.send()

			email_sent = True
	else:
		contact_form = ContactForm()

	return render_to_response('contact.html', {'bodyclass':'standalone', 'contactForm':contact_form, 'emailSent':email_sent}, context_instance=RequestContext(request))