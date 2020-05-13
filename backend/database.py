import MySQLdb

import api

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
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()


# store picture past in request
def storeImagePet(img, table, email):
    idUser = retrieveUser(email)
    print(idUser)
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "INSERT INTO " + table + "(img, idUser) VALUES (%s, %s)"
    cursor = db.cursor()
    try:
        result = cursor.execute(sql, [img, idUser])
        db.commit()
        item = {
            "id": cursor.lastrowid,
            "table": table
        }

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
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
                "id": row[2],
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
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return resultExport


# return all picture of animals store in the database
def getAll():
    CATEGORIES = ['chat', 'poule', 'chien', 'cheval', 'lapin']
    result = []
    for table in CATEGORIES:
        temp = getImage(table)
        if temp:
            result = result + temp
        temp = []
    return result


def retrieveUser(email):
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
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return listusers[0]['id']


def retrieveUserById(user_id):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = 'SELECT * FROM socialpet_users where id = %s'
    cursor = db.cursor()
    try:
        cursor.execute(sql, (user_id,))
        result = cursor.fetchone()
        user = {
            "id": result[0],
            "name": result[1],
            "lastname": result[2],
            "email": result[3],
            "password": result[4],
            "created_at": result[5]
        }
        print(user)
    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    return user


def createUser(name, lastname, email, password):
    hashedPassword = api.bcrypt.generate_password_hash(password, 13).decode()
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "INSERT INTO socialpet_users (name, lastname, email, password) VALUES (%s, %s, %s, %s)"
    cursor = db.cursor()
    try:
        result = cursor.execute(sql, [name, lastname, email, hashedPassword])
        db.commit()
        item = {
            "id": cursor.lastrowid,
            "table": "socialpet_users"
        }

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()
    return item


def logIn(email, password):
    db = MySQLdb.connect("cl1-sql7.phpnet.org", "univcergy22", "Socialpet1903!!", "univcergy22")
    sql = "SELECT * FROM socialpet_users where email = \"" + email + "\""
    cursor = db.cursor()
    user = []
    try:
        cursor.execute(sql)
        results = cursor.fetchall()
        for row in results:
            item = {
                "id": row[0],
                "name": row[1],
                "lastname": row[2],
                "email": row[3],
                "password": row[4]
            }
            user.append(item)

    except MySQLdb.Error as e:
        try:
            print("MySQL Error [%d]: %s" % (e.args[0], e.args[1]))
            return None
        except IndexError:
            print("MySQL Error: %s" % str(e))
            return None
        finally:
            cursor.close()
            db.close()

    if not api.bcrypt.check_password_hash(user[0]['password'], password):
        api.abort(401)
    return user[0]
