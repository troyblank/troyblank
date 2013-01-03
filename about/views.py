from django.shortcuts import render_to_response
from django.template.context import RequestContext

def about(request):
	return render_to_response('about.html', {'bodyclass':'standalone'}, context_instance=RequestContext(request))