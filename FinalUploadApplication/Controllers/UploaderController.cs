using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FinalUploadApplication.Controllers
{
    public class UploaderController : Controller
    {
        // GET: Upload
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Upload()
        {
            if (Request.IsAjaxRequest())
            {
                return View();
            }
            else
            {
                return new HttpNotFoundResult();
            }
        }

        [System.Web.Mvc.HttpPost]
        //public JsonResult Upload(HttpPostedFileBase uploadedFile) //uncomment
        public JsonResult Upload(HttpPostedFileBase[] uploadedFiles)
        {
            int fileCount = uploadedFiles.Count();
            int uploadedFileCount = 0;
            if (ModelState.IsValid)
            {
                foreach (var uploadedFile in uploadedFiles)
                {
                    if (uploadedFile != null && uploadedFile.ContentLength > 0)
                    {
                        var filePath = System.Web.HttpContext.Current.Server.MapPath("~/Uploads/");
                        var fileName = Path.GetFileName(uploadedFile.FileName);
                        var finalPath = Path.Combine("{0}{1}", filePath, fileName);
                        if (!(Directory.Exists(filePath))) //uncomment
                        {
                            Directory.CreateDirectory(filePath);
                        }
                        uploadedFile.SaveAs(finalPath);
                        uploadedFileCount++;
                    }
                }
                if ((uploadedFileCount > 0) && (fileCount > 0) && (uploadedFileCount != fileCount))
                {
                    return Json(new
                    {
                        statusCode = 400,
                        status = "Partially Saved,something went wrong",
                        file = string.Empty
                    }, JsonRequestBehavior.AllowGet);
                }
                else if ((uploadedFileCount == 0) && (fileCount > 0))
                {
                    return Json(new
                    {
                        statusCode = 400,
                        status = "No files to save",
                        file = string.Empty
                    }, JsonRequestBehavior.AllowGet);
                }
                else if ((fileCount > 0) && (uploadedFileCount > 0) && (uploadedFileCount == fileCount))
                {
                    return Json(new
                    {
                        statusCode = 200,
                        status = "Success",
                    }, JsonRequestBehavior.AllowGet);
                }
            }

            return Json(new
            {
                statusCode = 400,
                status = "Model State is not valid",
                file = string.Empty
            }, JsonRequestBehavior.AllowGet);

        }
    }
}