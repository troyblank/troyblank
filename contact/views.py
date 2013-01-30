from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from forms import ContactForm
from django.conf import settings
from django.core.mail import EmailMessage

import hashlib

def contact(request):
	email_sent = False

	if request.method == 'POST':
		contact_form = ContactForm(request.POST)

		if contact_form.is_valid():
			contactData = contact_form.cleaned_data

			#send email
			emailBody = '%s \n\n *** DO NOT REPLY TO THIS EMAIL, REPLY TO THE EMAIL BELOW ***\nThis email was sent by %s at the email %s from troyblank.com' % (contactData['message'], contactData['name'], contactData['email'])
			email = EmailMessage('!FROM TROYBLANK.COM!', emailBody, from_email=contactData['email'], to=[settings.CONTACT_EMAIL])
			email.send()

			email_sent = True
	else:
		contact_form = ContactForm()

	return render_to_response('contact.html', {'bodyclass':'standalone', 'contactForm':contact_form, 'emailSent':email_sent}, context_instance=RequestContext(request))

def send_email(request):

	#key = 'troyBlankSendzDaMails'

	print '-----------------'
	print request.method
	#print hash_spit

	#if request.method == 'POST':
            #print request.read()

	#m = hashlib.md5(str(name)+key+str(email+message))

	#print hash_spit
	#print m.hexdigest()
	#print '-----------------'

	#if hash_spit == m.hexdigest():

		#send email

	#	response = HttpResponse()
	#else:
	#	response = HttpResponseBadRequest()

	response = HttpResponse()
	return response