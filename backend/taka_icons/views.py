from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from .models import Icon
# from django.views.generic.base import View
from django.views import View
from django.core.files.storage import default_storage

def icon(request):
	model = Icon
	icon_id = request.GET.get('icon', '')
	print(icon_id)

	if(icon_id!=''):
		icon = model.objects.get(id=icon_id)
		data = {
			'id': icon.id,
			'name': icon.icon_name,
			'file': default_storage.open(icon.icon_file.path).read().decode("utf-8")
		}
		return JsonResponse(data, safe=False)


	else:
		icons = model.objects.all()
		data = [{
			'id': icon.id,
			'name': icon.icon_name,
			'file': default_storage.open(icon.icon_file.path).read().decode("utf-8")
		} for icon in icons]

		return JsonResponse(data, safe=False)