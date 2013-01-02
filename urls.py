from django.conf.urls import patterns, include, url
from django.conf import settings

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
	(r'^$', 'views.index'),
    url(r'^contact/$', 'contact.views.contact'),
    url(r'^specimens/(?P<year>\d{4})/(?P<specimen>\w+)/$', 'specimens.views.specimen'),
    # Examples:
    # url(r'^$', 'troyblank_com.views.home', name='home'),
    # url(r'^troyblank_com/', include('troyblank_com.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

if settings.DEBUG:
    urlpatterns+= patterns('',
        url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.MEDIA_ROOT, 'show_indexes': True})
    )
