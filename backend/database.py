import MySQLdb

global resultsExportUsers
resultsExportUsers = []

global db
db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")

# return all users in BDD
def getUsers():
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    del resultsExportUsers[:]
    sql = "SELECT * FROM socialpet"
    cursor = db.cursor()
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            item = {
                "id": row[0],
                "session": row[1],
                "email": row[2],
                "espece": row[3]
            }
            resultsExportUsers.append(item)
    except MySQLdb.Error as e:
        try:
            print ("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print ("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

# store picture past in request
def storeImagePet(img, table, email) :
    idUser = retrieveUser(email)
    print(idUser)
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "INSERT INTO " + table + "(img, idUser) VALUES (%s, %s)"
    cursor = db.cursor()
    try :
        result = cursor.execute(sql, [img, idUser])
        db.commit()
        item = {
            "id" : cursor.lastrowid,
            "table" : table
        }

    except MySQLdb.Error as e:
        try:
            print ("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print ("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()
    return item

# return all picture for one table store in the database
def getImage(table):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "SELECT * FROM " + table + " as tab INNER JOIN socialpet ON tab.idUser = socialpet.id"
    print(sql)
    cursor = db.cursor()
    resultExport = []
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            user = {
                "id" : row[2],
                "email": row[5]
            }

            item = {
                "id": row[0],
                "img": row[1],
                "table": table,
                "user": user
            }
            resultExport.append(item)

    except MySQLdb.Error as e:
        try:
            print ("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print ("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()
    
    return resultExport


# return all picture of animals store in the database
def getAll() :
    CATEGORIES = ['chat', 'poule', 'chien', 'cheval', 'lapin']
    result = []
    for table in CATEGORIES :
        temp = getImage(table)
        if temp :
            result = result + temp
        temp = []
    return result


def retrieveUser(email) :
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "SELECT id FROM socialpet where email = \"" + email + "\""
    cursor = db.cursor()
    listusers = []
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            item = {
                "id": row[0]
            }
            listusers.append(item)

    except MySQLdb.Error as e:
        try:
            print ("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print ("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return listusers[0]['id']

