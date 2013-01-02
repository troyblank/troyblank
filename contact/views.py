from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.http import Http404

def contact(request):
	return render_to_response('contact.html', {'bodyclass':'standalone'}, context_instance=RequestContext(request))