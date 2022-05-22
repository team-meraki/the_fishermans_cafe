from django.test import TestCase
from .models import CafeInfo
from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse


# Create your tests here.
class CafeInfoTestCase(TestCase):
    def setUp(self):
        info = CafeInfo.objects.create(location="test location", description="test description", 
        announcement="test announcement", table_accommodation="test table accommodation",
        delivery_info="test delivery info", schedule="test schedule", facebook="fb.com",
        contact_number="09123456789")

    def test_instance_count_always_one(self):
        info1 = CafeInfo.objects.all()
        self.assertEqual(info1.count(), 1)
    
    def test_id_is_one(self):
        info1 = CafeInfo.objects.get()
        self.assertEqual(info1.pk, 1)
    
    def test_create_behaves_as_update(self):
        info1 = CafeInfo.objects.create(location="new location", description="new description", 
        announcement="new announcement", table_accommodation="new table accommodation",
        delivery_info="new delivery info", schedule="new schedule", facebook="newfb.com",
        contact_number="09123456789")
        info2 = CafeInfo.objects.get()

        self.assertEqual(info2.pk, 1)
        self.assertEqual(info2.location, "new location")
        self.assertEqual(info2.description, "new description")
        self.assertEqual(info2.announcement, "new announcement")
        self.assertEqual(info2.table_accommodation, "new table accommodation")
        self.assertEqual(info2.delivery_info, "new delivery info")
        self.assertEqual(info2.schedule, "new schedule")
        self.assertEqual(info2.facebook, "newfb.com")
        self.assertEqual(info2.contact_number, "09123456789")

        info3 = CafeInfo(location="2new location", description="2new description", 
        announcement="2new announcement", table_accommodation="2new table accommodation",
        delivery_info="2new delivery info", schedule="2new schedule", facebook="2newfb.com",
        contact_number="09999999999")
        info3.save()
        info2 = CafeInfo.objects.get()

        self.assertEqual(info2.pk, 1)
        self.assertEqual(info2.location, "2new location")
        self.assertEqual(info2.description, "2new description")
        self.assertEqual(info2.announcement, "2new announcement")
        self.assertEqual(info2.table_accommodation, "2new table accommodation")
        self.assertEqual(info2.delivery_info, "2new delivery info")
        self.assertEqual(info2.schedule, "2new schedule")
        self.assertEqual(info2.facebook, "2newfb.com")
        self.assertEqual(info2.contact_number, "09999999999")
    
    def test_default_logo(self):
        info1 = CafeInfo.objects.get()
        self.assertEqual(info1.logo.name, "logo/tfcafe_logo.png")

    def test_delete_is_disabled(self):
        info2 = CafeInfo.objects.all()
        info2.delete()
        self.assertTrue(info2)
        info3 = CafeInfo.objects.get()
        info3.delete()        
        self.assertTrue(info3)
        info3 = CafeInfo(location="2new location", description="2new description", 
        announcement="2new announcement", table_accommodation="2new table accommodation",
        delivery_info="2new delivery info", schedule="2new schedule", facebook="2newfb.com",
        contact_number="09999999999")
        info3.save()
        info3.delete()        
        self.assertTrue(info3)

class ViewsTestCase(APITestCase):
    def test_product_api(self):
        url1 = reverse('product-list')
        url2 = reverse('product-detail', kwargs={"pk":1})
        response = self.client.delete(url2)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.get(url1)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 0)

        
        data = {
            'name':'test',
            'category':'meal',
            'price':'100.23',
        }
        response = self.client.post(url1, data=data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        
        response = self.client.get(url1)
        self.assertEqual(len(response.data), 0)


    def test_cafeinfo_api(self):
        CafeInfo.objects.create(location="test location", description="test description", 
        announcement="test announcement", table_accommodation="test table accommodation",
        delivery_info="test delivery info", schedule="test schedule", facebook="fb.com",
        contact_number="09123456789")
        url = reverse('get_update_cafeInfo')

        data = {
            "location":"new location", 
            "description":"new description", 
            "announcement":"new announcement",
            "table_accommodation":"new table accommodation",
            "delivery_info":"new delivery info",
            "schedule":"new schedule",
            "facebook":"http://newfb.com",
            "contact_number":"09123456789"
        }
                
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        response = self.client.post(url, data=data, format='multipart')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        