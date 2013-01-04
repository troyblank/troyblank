from django.shortcuts import render_to_response
from django.template.context import RequestContext
from django.http import Http404
from django import template

def specimen(request, year, specimen):
	template_name = year+'/'+specimen+'/specimen.html'

	try:
		template.loader.get_template(template_name)
		return render_to_response(template_name, {'bodyclass':'standalone'}, context_instance=RequestContext(request))
	except template.TemplateDoesNotExist:
		raise Http404